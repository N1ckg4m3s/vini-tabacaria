create table public.order_items (
    order_id uuid not null,
    product_id uuid not null,
    quantity integer not null,
    unit_price numeric not null,
    constraint order_items_pkey primary key (order_id, product_id),
    constraint order_items_order_id_fkey foreign KEY (order_id) references orders (id),
    constraint order_items_product_id_fkey foreign KEY (product_id) references products (id)
) TABLESPACE pg_default;