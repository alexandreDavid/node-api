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

INSERT INTO public.basemap(label, url, isdefault) VALUES
    ('Openstreetmap', 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', true),
    ('Grayscale', 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', false),
    ('Nothing', false, false);

-- Table: public.basemap_user

-- DROP TABLE public.basemap_user;

CREATE TABLE public.basemap_user
(
    user_id character varying COLLATE pg_catalog."default" NOT NULL,
    basemap_id integer NOT NULL,
    CONSTRAINT basemap_user_pkey PRIMARY KEY (user_id, basemap_id),
    CONSTRAINT user_id_unique UNIQUE (user_id),
    CONSTRAINT basemap_id_fkey FOREIGN KEY (basemap_id)
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

-- Table: public.area

-- DROP TABLE public.area;

CREATE TABLE public.area
(
    id integer NOT NULL DEFAULT nextval('area_id_seq'::regclass),
    user_id character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    type character varying COLLATE pg_catalog."default" NOT NULL,
    id_area integer,
    geom json[],
    CONSTRAINT area_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.area
    OWNER to postgres;

-- Table: public.setting

-- DROP TABLE public.setting;

CREATE TABLE public.setting
(
    id character varying COLLATE pg_catalog."default" NOT NULL,
    label character varying COLLATE pg_catalog."default" NOT NULL,
    type character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT setting_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.setting
    OWNER to postgres;

INSERT INTO public.setting(id, label, type) VALUES
    ('temperature', 'Temperature units', 'unit'),
    ('windSpeed', 'Wind speed', 'unit'),
    ('precipitations', 'Precipitations', 'unit'),
    ('pressure', 'Pressure', 'unit'),
    ('floodWarning', 'Flood warnings', 'alert'),
    ('stormWarning', 'Storm warnings', 'alert');

-- Table: public.setting_value

-- DROP TABLE public.setting_value;

CREATE TABLE public.setting_value
(
    setting_id character varying COLLATE pg_catalog."default" NOT NULL,
    key character varying COLLATE pg_catalog."default" NOT NULL,
    label character varying COLLATE pg_catalog."default",
    isdefault boolean,
    CONSTRAINT setting_value_pkey PRIMARY KEY (setting_id, key),
    CONSTRAINT setting_id_fkey FOREIGN KEY (setting_id)
        REFERENCES public.setting (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.setting_value
    OWNER to postgres;

INSERT INTO public.setting_value(setting_id, key, label, isdefault) VALUES
    ('temperature', 'C', '°C', true),
    ('temperature', 'F', '°F', false),
    ('temperature', 'K', 'K', false),
    ('windSpeed', 'kt', 'kt', false),
    ('windSpeed', 'btf', 'btf', false),
    ('windSpeed', 'm/s', 'm/s', false),
    ('windSpeed', 'mph', 'mph', true),
    ('windSpeed', 'km/h', 'km/h', false),
    ('precipitations', 'mh', 'm/hr', false),
    ('precipitations', 'mmh', 'mm/hr', true),
    ('pressure', 'Pa', 'Pa', true),
    ('pressure', 'hPa', 'hPa', false),
    ('floodWarning', 'true', 'ON', false),
    ('floodWarning', false, 'OFF', true),
    ('stormWarning', 'true', 'ON', false),
    ('stormWarning', false, 'OFF', true);

-- Table: public.setting_value

-- DROP TABLE public.setting_value;

CREATE TABLE public.setting_value
(
    setting_id character varying COLLATE pg_catalog."default" NOT NULL,
    key character varying COLLATE pg_catalog."default" NOT NULL,
    label character varying COLLATE pg_catalog."default",
    CONSTRAINT setting_value_pkey PRIMARY KEY (setting_id, key),
    CONSTRAINT setting_id_fkey FOREIGN KEY (setting_id)
        REFERENCES public.setting (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.setting_value
    OWNER to postgres;