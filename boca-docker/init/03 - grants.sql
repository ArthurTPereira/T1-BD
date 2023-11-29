-- Grant para ter permissão de inserir dados na sequência de logs
-- Solução para o erro:
-- ERROR:  permission denied for sequence xxxxxxxxxx

\connect bocadb;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public to PUBLIC;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT USAGE, SELECT ON SEQUENCES TO PUBLIC;