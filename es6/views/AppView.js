import Table from '../components/Table';

export default class AppView {

  constructor(stompClient, stompChannel, containerNode) {
    this.stompClient = stompClient;
    this.stompChannel = stompChannel;
    this.containerNode = containerNode;
    this.firstSparklineRendered = false;

    this.table = new Table(30 * 1000);
    this.onNewData = this.onNewData.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.render = this.render.bind(this);
  }


  onNewData(e) {
    const data = JSON.parse(e.body);
    this.table.updateRows(data);
  }

  subscribe() {
    this.subscriptionID = this.stompClient.subscribe(this.stompChannel, this.onNewData);
    this.table.subscribe(this.render);
    this.table.subscribe(this.drawInitialSparkLine);
    this.table.subscribeToSparkLineEvent(this.drawSparkLine);
  }

  unsubscribe() {
    this.stompClient.unsubscribe(this.subscriptionID);
    this.table.unsubscribe(this.render);
    this.table.unsubscribe(this.drawInitialSparkLine);
    this.table.unsubscribeFromSparkLineEvent(this.drawSparkLine);
  }

  render(tableRowList) {
    const node = this.containerNode;
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
    tableRowList.forEach(row => {
      node.appendChild(row.getNode());
    });
    if (!this.firstSparklineRendered) {
      this.firstSparklineRendered = true;
    }
  }

  drawSparkLine(tableRowList) {
    tableRowList.forEach(row => {
      row.drawSparkLine();
    })
  }

  drawInitialSparkLine(tableRowList) {
    tableRowList.forEach(row => {
      row.drawInitialSparkLine();
    })
  }
}
