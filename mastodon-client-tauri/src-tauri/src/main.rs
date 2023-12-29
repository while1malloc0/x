#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use megalodon;
use megalodon::error::Error;

#[tauri::command(async)]
async fn greet(name: String) -> Result<String, Error> {
    let client = megalodon::generator(
        megalodon::SNS::Mastodon,
        String::from("https://hachyderm.io"),
        None,
        None,
    );
    match client.get_instance().await {
        Ok(res) => {
            println!("{:#?}", res.json());
        }
        Err(e) => {
            println!("Error retrieving client {}", e)
        }
    }
    Ok(format!("Hello {}", name))
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
