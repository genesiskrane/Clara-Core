{ pkgs, ... }: {
  channel = "stable-24.05";

  packages = [
    pkgs.nodejs_20
    pkgs.nodePackages.npm
  ];

  idx = {
    previews = {
      enable = true;

      previews = {
        web = {
          command = ["npm" "start"];
          manager = "web";
          env = {
            PORT = "$PORT";
          };
        };
      };
    };

    workspace = {
      onCreate = {
        npm-install = "npm install";
      };
    };
  };
}
