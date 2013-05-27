/*global $, _, Backbone */

var BoardView = Backbone.View.extend({

  initialize: function () {
    this.el = $("#board");
    this.render();
    this.listenTo(this.model, "change:tiles", this.render);
  },

  //template: _.template($("#board-template").html()),

  render: function () {
    var template = "";

    _.each(this.model.tiles, function (row) {
      template += "<tr>";

      _.each(row, function (tile) {
        template += "<td>" + tile + "</td>";
      });

      template += "</tr>";
    });

    this.el.html(template);
    //this.$el.html(this.template(this.model.toJSON()));

    return this;
  }

});
