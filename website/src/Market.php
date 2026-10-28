<?php
declare(strict_types=1);

final class Market
{
    /** Prices in cents. Nominals use the middle row of the old board. */
    public static function catalog(): array
    {
        $rows = [
            ['Fe', 'Hierro', 'Básicos', 1, 1, 2, '#a8b5c9'],
            ['Cu', 'Cobre', 'Básicos', 2, 3, 5, '#5d9cf5'],
            ['Si', 'Silicio', 'Básicos', 1, 2, 3, '#f1c75b'],
            ['Ti', 'Titanio', 'Básicos', 3, 6, 9, '#58c79b'],
            ['Al', 'Aluminio', 'Básicos', 2, 3, 5, '#b9c3d5'],
            ['C', 'Carbono', 'Básicos', 1, 1, 2, '#e6eaf0'],
            ['Nd', 'Neodimio', 'Tierras raras', 5, 9, 14, '#de7ebe'],
            ['Gd', 'Gadolinio', 'Tierras raras', 3, 6, 9, '#57cec7'],
            ['Er', 'Erbio', 'Tierras raras', 3, 6, 9, '#f7a65e'],
            ['Ce', 'Cerio', 'Tierras raras', 3, 6, 9, '#c5946f'],
            ['H2SO4', 'Ácido sulfúrico', 'Reactivos', 2, 3, 5, '#b89ef7'],
            ['HCl', 'Ácido clorhídrico', 'Reactivos', 2, 3, 5, '#8eafff'],
            ['Tr', 'Transporte', 'Servicios', 4, 7, 11, '#72a9fa'],
            // Energy has no trading band on the old board: provisional tuning.
            ['En', 'Energía', 'Servicios', 1, 2, 4, '#f5d56a'],
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
        $anchor = $previous + .2 * ($resource['nominal'] - $previous);
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
