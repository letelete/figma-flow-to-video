export class RectangleNodeBuilder {
  private count = 1;
  private margin = 150;
  private size = 100;

  constructor() {}

  setCount(count: number) {
    this.count = count;
    return this;
  }

  setMargin(margin: number) {
    this.margin = margin;
    return this;
  }

  setSize(size: number) {
    this.size = size;
    return this;
  }

  build() {
    const rectangles = [] as RectangleNode[];
    for (let i = 0; i < this.count; ++i) {
      const rect = figma.createRectangle();
      rect.x = i * this.margin;
      rect.y = 0;
      rect.resize(this.size, this.size);
      rect.fills = [
        {
          type: 'SOLID',
          color: {
            r: Math.random(),
            g: Math.random(),
            b: Math.random(),
          },
        },
      ];
      rectangles.push(rect);
    }
    return rectangles;
  }
}
