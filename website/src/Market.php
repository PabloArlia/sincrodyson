<?php
declare(strict_types=1);

final class Market
{
    /** Prices in cents. Nominals use the middle row of the old board. */
    public static function catalog(): array
    {
        $rows = [
            ['Fe', 'Hierro', 'Básicos', 1, 1, 2, '#d84242'],
            ['Cu', 'Cobre', 'Básicos', 2, 3, 5, '#2490e5'],
            ['Si', 'Silicio', 'Básicos', 1, 2, 3, '#ffc233'],
            ['Ti', 'Titanio', 'Básicos', 3, 6, 10, '#28a85a'],
            ['Al', 'Aluminio', 'Básicos', 2, 3, 6, '#292929'],
            ['C', 'Carbono', 'Básicos', 1, 1, 2, '#fff'],
            ['Nd', 'Neodimio', 'Tierras raras', 5, 9, 15, '#e72e98'],
            ['Gd', 'Gadolinio', 'Tierras raras', 3, 6, 10, '#28b8b0'],
            ['Er', 'Erbio', 'Tierras raras', 3, 6, 10, '#ef8c32'],
            ['Ce', 'Cerio', 'Tierras raras', 3, 6, 10, '#b47745'],
            ['H2SO4', 'Ácido sulfúrico', 'Reactivos', 2, 3, 5, '#b89ef7'],
            ['HCl', 'Ácido clorhídrico', 'Reactivos', 2, 3, 5, '#8eafff'],
            ['Tr', 'Transporte', 'Servicios', 4, 7, 15, '#72a9fa'],
            // Energy has no trading band on the old board: provisional tuning.
            ['En', 'Energía', 'Servicios', 1, 2, 4, '#f5d56a'],
            ['FT', 'Fichas de Técnica', 'Fichas', 1, 3, 6, '#79c989'],
        ];
        $out = [];
        foreach ($rows as [$id, $name, $group, $min, $nominal, $max, $color]) {
            $out[$id] = compact('id', 'name', 'group', 'color') + [
                'min' => $min * 100, 'nominal' => $nominal * 100,
                'max' => $max * 100, 'liquidity' => 10,
            ];
        }
        return $out;
    }

    public static function price(array $resource, int $previous, int $imbalance): int
    {
        $anchor = $previous + .1 * ($resource['nominal'] - $previous);
        $pressure = $imbalance / ($resource['liquidity'] + abs($imbalance));
        $distance = $imbalance >= 0 ? $resource['max'] - $anchor : $anchor - $resource['min'];
        return max($resource['min'], min($resource['max'], (int) round($anchor + $pressure * $distance)));
    }

    /** Reproducible warmup without touching PHP's global RNG or player finances. */
    public static function warmup(array $catalog, string $seed): array
    {
        $history = [];
        foreach ($catalog as $id => $r) {
            $previous = $r['nominal'];
            $history[$id] = [['round' => -2, 'price' => $previous, 'simulated' => true, 'imbalance' => 0]];
            foreach ([-1, 0] as $round) {
                $hash = hash('sha256', "$seed:$id:$round");
                $buy = hexdec(substr($hash, 0, 4)) % 7;
                $sell = hexdec(substr($hash, 4, 4)) % 7;
                $previous = self::price($r, $previous, $buy - $sell);
                $history[$id][] = ['round' => $round, 'price' => $previous, 'simulated' => true, 'imbalance' => $buy - $sell];
            }
        }
        return $history;
    }
}
