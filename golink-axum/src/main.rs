use axum::{
    routing::get,
    Router,
    extract::{Extension, Path}
};
use sea_orm::{Database};
use std::net::SocketAddr;
use std::env;

#[tokio::main]
async fn main() {
    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL not set");
    let db = Database::connect(db_url).await.expect("could not connect to DB");

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

async fn shortcode_redirect_handler(Path(shortcode): Path<String>) -> String {
    shortcode
}