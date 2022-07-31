create extension if not exists "uuid-ossp";

create table products (
	id uuid primary key default uuid_generate_V4(),
	title text not null,
	description text,
	price integer
)

create table stocks (
	product_id uuid,
	foreign key (product_id) references products (id),
	count integer
)

insert into products (title, description, price) values
(

)


insert into stocks (product_id, count) values
(
'3e6b2cf5-77a9-4248-9006-0d59980ac1c6',
20
),
(
'8c5bf7f3-b53f-48d0-8647-2535ef7f4063',
10
),
(
'b53eb810-ee3e-45a9-8385-848c365f26ec',
15
)



insert into products (title, description, price) values
(
    'Marvel`s Spider Man',
    'Video game',
    50
),
(
	'Ghostwire: Tokyo',
    'Video game',
    60
),
(
	'Stray',
    'Video game',
    30
)
