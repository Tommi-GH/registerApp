
export class PieData{
  labels: string[]
  datasets: Dataset[]

  constructor(labels : string[], dataset : Dataset){
    this.labels = labels;
    this.datasets = [dataset];
  }
  }

  export class Dataset {
    data: number[]
    backgroundColor: string[]
    hoverBackgroundColor: string[]

    constructor (data: number[], backgroundColor: string[], hoverBackgroundColor: string[]){
      this.data = data;
      this.backgroundColor = backgroundColor;
      this.hoverBackgroundColor = hoverBackgroundColor;
    }
  }