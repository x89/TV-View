CREATE TABLE shows (
    id integer DEFAULT nextval('shows_pkey'::regclass) NOT NULL,
    name text NOT NULL
);
ALTER TABLE public.shows OWNER TO postgres;


CREATE SEQUENCE tv_id_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE public.tv_id_sequence OWNER TO postgres;


SELECT pg_catalog.setval('tv_id_sequence', 1, true);

CREATE TABLE tv (
    id integer DEFAULT nextval('tv_id_sequence'::regclass) NOT NULL,
    name text,
    rating numeric(4,2) NOT NULL,
    season integer,
    episode integer,
    view_date timestamp with time zone DEFAULT ('now'::text)::timestamp with time zone,
    show_id integer DEFAULT 0 NOT NULL,
    CONSTRAINT rating_max CHECK ((rating <= (10)::numeric)),
    CONSTRAINT rating_min CHECK ((rating >= (0)::numeric))
);
ALTER TABLE public.tv OWNER TO postgres;

CREATE VIEW tv_view AS
    SELECT t.id, t.rating, t.season, t.episode, t.view_date, s.name FROM tv t, shows s WHERE (t.show_id = s.id);


ALTER TABLE public.tv_view OWNER TO postgres;

GRANT SELECT ON TABLE tv_view TO lighty;
