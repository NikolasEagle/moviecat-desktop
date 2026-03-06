const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");
const path = require('path');

module.exports = {
  packagerConfig: {
    asar: true,
    icon: path.resolve(__dirname, "src/icon"),
    name: "MovieCat",
    executableName: "moviecat",
    appCopyright: "Copyright © 2024 NikolasEagle",
    appVersion: "1.2.0",
    win32metadata: {
      CompanyName: "NikolasEagle",
      FileDescription: "MovieCat - Movie App",
      InternalName: "MovieCat",
      ProductName: "MovieCat",
      OriginalFilename: "MovieCat.exe",
    },
  },
  rebuildConfig: {},
  makers: [
    // NSIS пакет для Windows
    {
      name: "@felixrieseberg/electron-forge-maker-nsis",
      platforms: ["win32"],
      config: {
        getAdditionalConfig: async () => {
          return {
            icon: path.resolve(__dirname, "src/icon.ico"),
            setupIcon: path.resolve(__dirname, "src/icon.ico"),

            oneClick: false,
            allowToChangeInstallationDirectory: true,
            perMachine: true,
            createDesktopShortcut: true,
            createStartMenuShortcut: true,
            shortcutName: "MovieCat",

            license: path.resolve(__dirname, "LICENSE"),

            language: 1049,

            artifactName: "moviecat-v${version}.exe",

            compression: "maximum"
          };
        }
      },
    },

    // DEB пакет для Linux (оставляем без изменений)
    {
      name: "@electron-forge/maker-deb",
      platforms: ["linux"],
      config: {
        options: {
          name: "moviecat",
          productName: "MovieCat",
          genericName: "Movie Application",
          version: "1.2.0",
          arch: "amd64",
          maintainer: "NikolasEagle eagle.dev.stack@gmail.com",
          homepage: "https://github.com/NikolasEagle/moviecat-desktop",
          description: "Movie application for watching and managing movies",
          section: "video",
          priority: "optional",
          categories: ["Video", "Player"],
          icon: "src/icon.png",
          bin: "moviecat",
          depends: ["libc6", "libglib2.0-0", "libnss3", "libx11-6"],
          recommends: ["ffmpeg"],
        },
      },
    },

    // ZIP архивы для отладки (опционально, раскомментируй если нужно)
    /*
    {
      name: "@electron-forge/maker-zip",
      platforms: ["win32", "linux", "darwin"],
    },
    */
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};