var viewModel = {
    model: ko.observableArray(),
    values: ko.observableArray(),
};

var randomGenerator = {
    Store: {},
    Get: function() {
        var val = Math.ceil(Math.random() * 10000000000);
        if (typeof this.Store[val] != 'undefined')
            val = this.Get();
        this.Store[val] = true;
        return val;
    }
}

// constructor
var FormBuilder = function() {
    this.index = 0;
}

FormBuilder.prototype.applyBindings = function() {
    ko.cleanNode($('#target')[0]);
    ko.applyBindings(viewModel, $('#target')[0]);
}

FormBuilder.prototype.BuildParentInput = function(id, elem, _index, type) {
    var textHTML = '<div id="' +id +'_parent" class="box parent">';
    textHTML += '<h6>' +elem.field_name +'</h6>';
    textHTML += '<input type="' +type +'" id="' +id 
        +'" data-bind="value:  model()[' +_index +']">';
    textHTML += '</div>';

    return textHTML;
}

FormBuilder.prototype.BuildParentCheckbox = function(id, elem, _index) {
    var textHTML = '<div id="' +id +'_parent" class="box parent">';
    textHTML += '<h6>' +elem.field_name +'</h6>';
    textHTML += '<input type="checkbox" id="' +id 
        +'" data-bind="checked:  model()[' +_index +']">';
    textHTML += '<div id="' +id +'_child" class="box"></div>';
    textHTML += '</div>';

    return textHTML;
}

FormBuilder.prototype.BuildParentSelect = function(id, elem, _index) {
    var textHTML = '<div id="' +id +'_parent" class="box parent">';
    textHTML += '<h6>' +elem.field_name +'</h6>';
    textHTML += "<select id=\"" +id +"\" data-bind=\"options: model()["
            +_index +"], optionsText: 'field_name', optionsValue: 'field_index', value: values()["
            +_index +"]\"></select>";
    textHTML += '<div id="' +id +'_child" class="box"></div>';
    textHTML += '</div>';

    return textHTML;
}


FormBuilder.prototype.Render = function(parent, data, forceIndex) {
    var that = this;
    data.forEach(function(elem, i) {
        var id = elem.field_name.replace(/\s/, '_') + randomGenerator.Get();

        var _index = that.index;
        switch (elem.field_type) {
            case "select":
            var textHTML = that.BuildParentSelect(id, elem, _index);
            parent.append(textHTML);

            // TODO - we need to be able to recycle these variables when re render is called
            viewModel.model.push(ko.observableArray(elem.children));
            viewModel.values.push(ko.observable('workitems'));  
            if (elem.children && elem.children.length) {
                console.log("added subscription to", _index)
                viewModel.values()[_index].subscribe(function(val) {
                    // debugger;
                    var selectedIndex = parseInt(val);
                    console.log(elem.children[selectedIndex].children);
                    $(['#', id, '_child'].join('')).html('');
                    if (elem.children[selectedIndex] && elem.children[selectedIndex].children && elem.children[selectedIndex].children.length > 0) {
                        // clear the child and re render
                        that.Render($(['#', id, '_child'].join('')), elem.children[selectedIndex].children);
                        that.applyBindings();
                    }
                });
            }
            // ko.cleanNode($(['#', id, '_parent'].join(''))[0]);
            // ko.applyBindings(viewModel, $(['#', id, '_parent'].join(''))[0])
            break;

            case "text":
            var textHTML = that.BuildParentInput(id, elem, _index, "text");
            parent.append(textHTML);
            viewModel.model.push(ko.observable(elem.field_value));
            viewModel.values.push({});
            // expecting a text field to have no dependency
            break;

            case "checkbox":
            var textHTML = that.BuildParentCheckbox(id, elem, _index);
            parent.append(textHTML);
            viewModel.model.push(ko.observable(elem.field_value));
            viewModel.values.push({});
            // todo - children
            if (elem.children && elem.children.length) {
                console.log("added subscription to", _index);

                var onChangeCallback = function(val) {
                    var selectedIndex = (val) ? 1 : 0;
                    $(['#', id, '_child'].join('')).html('');
                    if (elem.children[selectedIndex] && elem.children[selectedIndex].children && elem.children[selectedIndex].children.length > 0) {
                        // clear the child and re render
                        that.Render($(['#', id, '_child'].join('')), elem.children[selectedIndex].children);
                        that.applyBindings();
                    }
                }
                viewModel.model()[_index].subscribe(onChangeCallback);
                setTimeout(function() {
                    onChangeCallback(elem.field_value);
                }, 500);
            }
            break;

            case "date":
            var textHTML = that.BuildParentInput(id, elem, _index, "date");
            parent.append(textHTML);
            viewModel.model.push(ko.observable(elem.field_value));
            viewModel.values.push({});
            // expecting a text field to have no dependency
            break;
        }

        that.index++;
    });

}

$.get('./data', function(d) {
    console.log(d);

    var fb = new FormBuilder();
    fb.Render($('#target'), d);
    // fb.applyBindings();
});