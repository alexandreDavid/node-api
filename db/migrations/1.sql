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
    CONSTRAINT dashboard_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.dashboard
    OWNER to postgres;