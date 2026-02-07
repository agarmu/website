{
  description = "mukul's personal website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils = {
      url = "github:numtide/flake-utils";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {self, nixpkgs, flake-utils}:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        hugo = pkgs.hugo;
        serve = pkgs.writeShellApplication {
          name = "serve";
          runtimeInputs = [ hugo ];
          text = ''
            exec hugo server -D -F --bind 0.0.0.0 --port 1313 "$@"
          '';
        };
        in {
          apps = {
            serve = flake-utils.lib.mkApp { drv = serve; };
          };
          devShells.default = {
            packages = [ hugo ];
          };
          formatter = pkgs.nixfmt;
        }
    );
}
