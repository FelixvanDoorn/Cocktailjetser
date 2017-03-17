/**
 * Created by thomaso on 17-3-2017.
 */

var itemBlueprint;

function setBlueprints() {
    itemBlueprint = $('#rowBlueprint').detach().html();
}

function updateList() {
    $.ajax({
        method: "POST",
        url: "data.php",
        dataType: 'json',
        data: { type: 'getList' }
    }).done(function(data) {
        var upcoming = $('#upcoming');
        upcoming.find('li').addClass('needsRemoving');
        var newest = 0;
        $.each(data, function(key, value) {
            var found = upcoming.find('li.number'+ value);
            if ($(found).length) {
                $(found).removeClass('needsRemoving');
            } else {
                newest = value;
                $('#upcoming').append(itemBlueprint.split('%number%').join(value));
            }
        });
        upcoming.find('.needsRemoving').fadeOut(1000, function() { $(this).remove() });
        upcoming.find(':not(.needsRemoving):hidden').fadeIn(1000).css("display","inline-block");
        if (newest > 0) {
            $('#newest span').html(newest);
        }
    });
}

function checkHashtag() {
    var type = window.location.hash.substr(1);
    if (type == 'screen') {
        $('#next').hide();
    }
}

$(document).ready(function() {
    setBlueprints();
    checkHashtag();
    setInterval(updateList, 1000);

    $('#nextNumber').click(function() {
        $.ajax({
            method: "POST",
            dataType: 'json',
            url: "data.php",
            data: { type: 'next' }
        }).done(function() {
            updateList();
        });
    });

    $('#upcoming').on('click', 'li', function() {
        var number = $(this).attr('class').replace('number', '');
        var that = this;
        $.ajax({
            method: "POST",
            dataType: 'json',
            url: "data.php",
            data: { type: 'done', number: number }
        }).done(function(result) {
            updateList();
        });
    });
});