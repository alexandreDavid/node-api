CREATE DATABASE dfms_users
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United Kingdom.1252'
    LC_CTYPE = 'English_United Kingdom.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Table: public.dashboard

-- DROP TABLE public.dashboard;

CREATE TABLE public.dashboard
(
    id integer NOT NULL DEFAULT nextval('dashboard_id_seq'::regclass),
    title character varying COLLATE pg_catalog."default" NOT NULL,
    description character varying COLLATE pg_catalog."default",
    user_id character varying COLLATE pg_catalog."default" NOT NULL,
    layout json,
    widgets json[],
    CONSTRAINT dashboard_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.dashboard
    OWNER to postgres;

-- Table: public.basemap

-- DROP TABLE public.basemap;

CREATE TABLE public.basemap
(
    id integer NOT NULL DEFAULT nextval('basemap_id_seq'::regclass),
    label character varying COLLATE pg_catalog."default",
    url character varying COLLATE pg_catalog."default",
    isdefault boolean,
    CONSTRAINT basemap_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.basemap
    OWNER to postgres;

INSERT INTO public.basemap(
    label, url, isdefault)
    VALUES ('Openstreetmap', 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', true),
    VALUES ('Grayscale', 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'. false),
    VALUES ('Nothing', false, false);

-- Table: public.basemap_user

-- DROP TABLE public.basemap_user;

CREATE TABLE public.basemap_user
(
    user_id character varying COLLATE pg_catalog."default" NOT NULL,
    basemap_id integer NOT NULL,
    CONSTRAINT basemap_user_pkey PRIMARY KEY (user_id, basemap_id),
    CONSTRAINT user_id_unique UNIQUE (user_id),
    CONSTRAINT basemap_id_fk FOREIGN KEY (basemap_id)
        REFERENCES public.basemap (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.basemap_user
    OWNER to postgres;