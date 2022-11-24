use axum::{
    routing::get,
    Router,
    extract::Extension
};
use sea_orm::{Database, DatabaseConnection};
use std::net::SocketAddr;
use std::env;

#[tokio::main]
async fn main() {
    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL not set");
    let db = Database::connect(db_url).await.expect("could not connect to DB");

    // build our application with a route
    let app = Router::new()
        // `GET /` goes to `root`
        .route("/", get(root))
        .layer(Extension(db));

    // run our app with hyper
    // `axum::Server` is a re-export of `hyper::Server`
    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

// basic handler that responds with a static string
async fn root(Extension(db): Extension<DatabaseConnection>) -> String {
    format!("{:?}", db)
}
