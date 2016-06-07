(function(angular) {
  'use strict';
function SneakersAppController() {

}

angular.
  module('SneakersApp').
  component('sneakersList', {
    templateUrl: 'sneakersList.html',
    /*'<table id="example1" class="table table-bordered table-striped">'+
        '<thead>'+
            '<tr>'+
                '<th rowspan="2">ID</th>'+
                '<th rowspan="2">Name</th>'+
                '<th rowspan="2">Gender</th>'+
                '<th rowspan="2">Type</th>'+
                '<th rowspan="2">Brand</th>'+
                '<th rowspan="2">Color</th>'+
                '<th rowspan="2">Price</th>'+
                '<th colspan="9">Size</th>'+
            '</tr>'+
            '<tr>'+
                '<th>36</th>'+
                '<th>37</th>'+
                '<th>38</th>'+
                '<th>39</th>'+
                '<th>40</th>'+
                '<th>41</th>'+
                '<th>42</th>'+
                '<th>43</th>'+
                '<th>44</th>'+
            '</tr>'+
        '</thead>'+
        '<tbody>'+
            '<tr>' +
                '<td>{{$ctrl.sn[0].ID}}</td>'+
                '<td>UltraBoost</td>'+
                '<td>Men</td>'+
                '<td>Running</td>'+
                '<td>Adidas</td>'+
                '<td>Black</td>'+
                '<td>3500000</td>'+
                '<td>0</td>'+
                '<td>0</td>'+
                '<td>0</td>'+
                '<td>0</td>'+
                '<td>10</td>'+
                '<td>10</td>'+
                '<td>10</td>'+
                '<td>10</td>'+
                '<td>10</td>'+
            '</tr>'+
            '<tr>'+
                '<td>MS002</td>'+
                '<td>Y-3</td>'+
                '<td>Men</td>'+
                '<td>Casual</td>'+
                '<td>Adidas</td>'+
                '<td>Black</td>'+
                '<td>7000000</td>'+
                '<td>0</td>'+
                '<td>0</td>'+
                '<td>0</td>'+
                '<td>0</td>'+
                '<td>10</td>'+
                '<td>10</td>'+
                '<td>10</td>'+
                '<td>3</td>'+
                '<td>0</td>'+
            '</tr>'+
        '</tbody>'+

        '<tfoot>'+
            '<tr>'+
                '<th rowspan="2">ID</th>'+
                '<th rowspan="2">Name</th>'+
                '<th rowspan="2">Gender</th>'+
                '<th rowspan="2">Type</th>'+
                '<th rowspan="2">Brand</th>'+
                '<th rowspan="2">Color</th>'+
                '<th rowspan="2">Price</th>'+
                '<th>36</th>'+
                '<th>37</th>'+
                '<th>38</th>'+
                '<th>39</th>'+
                '<th>40</th>'+
                '<th>41</th>'+
                '<th>42</th>'+
                '<th>43</th>'+
                '<th>44</th>'+ 
            '</tr>'+
            '<tr>'+
                '<th colspan="9">Size</th>'+
            '</tr>'+
        '</tfoot>'+
    '</table>',*/
    controller: SneakersAppController,
    bindings: {
        sneakers: '<'
    }
  });
})(window.angular);