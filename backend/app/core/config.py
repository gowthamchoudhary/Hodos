from supabase import create_client
from dotenv import load_dotenv
import os       
from urllib.parse import parse_qsl, quote, urlencode, urlsplit, urlunsplit

load_dotenv()

def clean_database_url(url: str) -> str:
    url = url.strip()
    if "://" in url and "@" in url:
        scheme, rest = url.split("://", 1)
        userinfo, hostinfo = rest.rsplit("@", 1)
        if ":" in userinfo:
            username, password = userinfo.split(":", 1)
            url = (
                f"{scheme}://"
                f"{quote(username, safe='')}:{quote(password, safe='')}"
                f"@{hostinfo}"
            )

    parts = urlsplit(url)
    query = urlencode(
        [
            (key, value)
            for key, value in parse_qsl(parts.query, keep_blank_values=True)
            if key != "pgbouncer"
        ]
    )
    return urlunsplit((parts.scheme, parts.netloc, parts.path, query, parts.fragment))

DATABASE_URL:str = clean_database_url(os.getenv("DATABASE_URL", ""))
SUPABASE_URL:str = os.getenv("SUPABASE_URL","")
SUPABASE_KEY:str = os.getenv("SUPABASE_KEY")
SUPABASE_STORAGE_BUCKET: str = os.getenv("SUPABASE_STORAGE_BUCKET", "resumes")
SUPABASE_JWT_SECRET: str = os.getenv("SUPABASE_JWT_SECRET", "")
SUPABASE_JWT_AUDIENCE: str = os.getenv("SUPABASE_JWT_AUDIENCE", "authenticated")
SUPABASE_JWT_ISSUER: str = os.getenv("SUPABASE_JWT_ISSUER", "")
SUPABASE_JWKS_URL: str = os.getenv("SUPABASE_JWKS_URL", "")

supabase = create_client(SUPABASE_URL,SUPABASE_KEY)
