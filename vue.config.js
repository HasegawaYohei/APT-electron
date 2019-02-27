module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        extends: null,
        directories: {
          output: 'build',
        },
        files: [
        ],
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: 'link',
              path: '/Applications',
            },
            {
              x: 130,
              y: 150,
              type: 'file',
            },
          ],
        },
        mac: {
          icon: 'build/icons/icon.icns',
          target: [
            'dmg',
          ],
        },
        win: {
          icon: 'build/icons/icon.ico',
          target: 'nsis',
        },
      },
    },
  },
};
