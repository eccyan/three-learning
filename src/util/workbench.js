import dat from 'dat.gui';

const gui = new dat.GUI();

export default (update) => {
  return (Klass) => {
    return class extends Klass {
      constructor() {
        super();

        const settings = new Map(Object.entries(this.settings || {}));
        const items = Array.from(settings.entries())
          .reduce((prev, curr) => { prev[curr[0]] = curr[1].value; return prev; }, {});
        const folder = gui.addFolder(Klass.name);
        settings.forEach((value, key) => {
          (value.isColor === true) ?
            folder.addColor(items, key).onChange(() => update(this, items))
            : folder.add(items, key).onChange(() => update(this, items));
        });
        folder.open();

        this.settings = settings;
      }
    };
  };
};
