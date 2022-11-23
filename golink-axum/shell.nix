{ pkgs ? import <nixpkgs> {} }: 
    pkgs.mkShell rec {
        buildInputs = with pkgs; [ pkgs.rustc pkgs.cargo pkgs.sqlite ];
    }
