const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");
const path = require('path');

module.exports = {
  packagerConfig: {
    asar: true,
    icon: "src/icon",
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
    // DEB пакет для Linux (Debian/Ubuntu)
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

    // NSIS пакет для Windows
    {
      name: "@felixrieseberg/electron-forge-maker-nsis",
      platforms: ["win32"],
      config: {
        // 👇 ПРАВИЛЬНЫЙ МЕТОД для этой библиотеки
        getBuilderOptions: (forgeConfig, forgeConfigExtra) => {
          return {
            win: {
              icon: path.resolve(__dirname, "src/icon.ico")
            },
            nsis: {
              oneClick: false,
              allowToChangeInstallationDirectory: true,
              perMachine: true,

              installerIcon: path.resolve(__dirname, "src/icon.ico"),
              uninstallerIcon: path.resolve(__dirname, "src/icon.ico"),

              createDesktopShortcut: true,
              createStartMenuShortcut: true,
              shortcutName: "MovieCat",

              license: path.resolve(__dirname, "LICENSE.txt"),
              language: "1049",

              artifactName: "moviecat-v${version}.exe",

              packElevateHelper: true,
              menuCategory: "MovieCat",
              compression: "maximum"
            }
          };
        }
      },
    },

    /* MSI пакет для Windows (через WiX)
    {
      name: "@electron-forge/maker-wix",
      platforms: ["win32"],
      config: {
        name: "MovieCat",
        version: "1.2.0",
        manufacturer: "NikolasEagle",
        description: "Movie App for Windows",
        language: 1049,
        arch: "x64",
        icon: "src/icon.ico",
        setupIcon: "src/icon.ico",
        certificateFile: "",
        certificatePassword: "",
        signWithParams: "",
        ui: {
          chooseDirectory: true,
          license: "LICENSE.txt",
        },
        shortcutName: "MovieCat",
        programFilesFolderName: "MovieCat",
        createDesktopShortcut: true,
        createStartMenuShortcut: true,
        startMenuFolderName: "MovieCat",
        localize: false,
        upgradeCode: "aca439d0-b169-4ce3-aab1-5860c129338a",
      },
    },*/

    // ZIP архивы для всех платформ
    /*{
      name: "@electron-forge/maker-zip",
      platforms: ["darwin", "linux", "win32"],
      config: {
        name: "moviecat",
      },
    },*/
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
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
