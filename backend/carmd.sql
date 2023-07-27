\echo 'Delete and recreate carmd db?'
\prompt 'Return for yes or control-C to cancel > ' foo


DROP DATABASE carmd;
CREATE DATABASE carmd;
\connect carmd

\i carmd-schema.sql 

-- \echo 'Delete and recreate lsoh_test db?'
-- \prompt 'Return for yes or control-C to cancel > ' foo 

-- DROP DATABASE carmd_test;
-- CREATE DATABASE carmd_test;
-- \connect carmd_test
