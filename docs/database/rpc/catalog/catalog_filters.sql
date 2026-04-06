create
or replace function catalog_filters (
    p_tipos text [] default null,
    p_marcas text [] default null
) returns table (key text, value text, count bigint) language sql as $ $ WITH filtered_products AS (
    SELECT
        *
    FROM
        products
    WHERE
        visible = true
        AND (
            p_tipos IS NULL
            OR array_length(p_tipos, 1) IS NULL
            OR tipo = ANY(p_tipos)
        )
        AND (
            p_marcas IS NULL
            OR array_length(p_marcas, 1) IS NULL
            OR marca = ANY(p_marcas)
        )
),
metadata_values AS (
    SELECT
        key,
        jsonb_array_elements_text(value) AS value
    FROM
        filtered_products,
        jsonb_each(metadata)
    WHERE
        jsonb_typeof(value) = 'array'
),
column_values AS (
    SELECT
        'marca' as key,
        marca as value
    FROM
        filtered_products
    WHERE
        marca IS NOT NULL
    UNION
    ALL
    SELECT
        'tipo' as key,
        tipo as value
    FROM
        filtered_products
    WHERE
        tipo IS NOT NULL
)
SELECT
    key,
    value,
    COUNT(*) as count
FROM
    (
        SELECT
            *
        FROM
            metadata_values
        UNION
        ALL
        SELECT
            *
        FROM
            column_values
    ) all_filters
GROUP BY
    key,
    value
ORDER BY
    key,
    count DESC;

$ $;