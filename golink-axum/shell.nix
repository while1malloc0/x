{ pkgs ? import <nixpkgs> {} }: 
    pkgs.mkShell rec {
        buildInputs = with pkgs; [ 
            pkgs.rustc 
            pkgs.cargo 
            pkgs.sqlite 
            pkgs.rust.packages.stable.rustPlatform.rustcSrc
            pkgs.rust.packages.stable.rustPlatform.rustLibSrc
        ];
        RUST_SRC_PATH = "${pkgs.rust.packages.stable.rustPlatform.rustLibSrc}";
    }
