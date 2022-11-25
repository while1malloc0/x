use axum::{
    routing::get,
    Router,
    extract::{Extension, Path},
    response::Redirect
};
use std::net::SocketAddr;
use std::env;
use sqlx::sqlite::SqlitePool;

#[derive(sqlx::FromRow)]
struct Link {
    shortcode: String,
    target: String,
}

#[tokio::main]
async fn main() {
    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL not set");
    let db = SqlitePool::connect(&db_url).await.expect("could not connect to DB");

    let app = Router::new()
        .route("/", get(root))
        .route("/:shortcode", get(shortcode_redirect_handler))
        .layer(Extension(db));

    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn root() -> String {
    "working".to_string()
}

async fn shortcode_redirect_handler(Extension(db_pool): Extension<SqlitePool>, Path(shortcode): Path<String>) -> Redirect {
    let mut conn = db_pool.acquire().await.expect("could not connect to DB");
    let result = sqlx::query_as::<_, Link>("SELECT * FROM links WHERE shortcode = $1")
        .bind(shortcode)
        .fetch_one(&mut conn)
        .await
        .expect("could not find link");
    Redirect::permanent(&result.target)
}