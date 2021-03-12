# The Improv Machine - Backend - DB

## Useful queries

- Update existing JSONB field with a new property based on the value of an existing one:

  ```sql
  UPDATE suggestion s1 SET content = jsonb_insert(content, '{imagepage}', (
  SELECT to_jsonb(REPLACE(content->>'url', '.jpg',''))
  FROM suggestion s2
  WHERE s1.id=s2.id))
  WHERE suggestioncategoryid=1;
  ```
