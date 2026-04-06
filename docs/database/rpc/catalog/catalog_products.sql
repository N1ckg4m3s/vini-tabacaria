CREATE function catalog_products(
    p_tipos text [] DEFAULT NULL,
    p_marcas text [] DEFAULT NULL,
    p_meta jsonb DEFAULT NULL
) RETURNS SETOF products LANGUAGE sql AS $ $
SELECT
    *
FROM
    products p
WHERE
    p.visible = true
    AND (
        p_tipos IS NULL
        OR p.tipo = ANY(p_tipos)
    )
    AND (
        p_marcas IS NULL
        OR p.marca = ANY(p_marcas)
    )
    AND (
        p_meta IS NULL
        OR NOT EXISTS (
            SELECT
                1
            FROM
                jsonb_each(p_meta) f
            WHERE
                NOT (
                    p.metadata -> f.key ? | (
                        SELECT
                            array_agg(value)
                        FROM
                            jsonb_array_elements_text(f.value)
                    )
                )
        )
    );

$ $;