<template>
    <br>
    <div class="row">
        <div class="col-xs-12">
            <div id="chart__kills" class="teams_statistic"></div>
        </div>
        <div class="col-xs-12">
            <div id="chart__flags_collected" class="teams_statistic"></div>
        </div>
        <div class="col-xs-12">
            <div id="chart__flags_captured" class="teams_statistic"></div>
        </div>
        <div class="col-xs-12">
            <div id="chart__kill_locations" class="teams_statistic"></div>
        </div>
    </div>
</template>

<script type="text/babel">
    import api from '../../api';

    export default {
        data() {
            return {};
        },
        computed: {},
        route: {
            activate() {
                jQuery(function ($) {
                    api.statistics()
                            .then(result => {
                                console.log('some result');
                                console.log(result);

                                var kills = [];
                                for (var i = 0; i < result.kills.length; i++) {
                                    console.log(result.kills[i]);
                                    kills[i] = MG.convert.date(result.kills[i], 'date');
                                }

                                var captured = [];
                                for (var i = 0; i < result.flagsCaptured.length; i++) {
                                    console.log(result.flagsCaptured[i]);

                                    captured[i] = MG.convert.date(result.flagsCaptured[i], 'date');
                                }

                                var collected = [];
                                for (var i = 0; i < result.flagsCollected.length; i++) {
                                    console.log(result.flagsCollected[i]);
                                    collected[i] = MG.convert.date(result.flagsCollected[i], 'date');
                                }

                                console.log(kills, captured, collected);

                                MG.data_graphic({
                                    title: "Kills",
                                    description: "Hourly kills for each team.",
                                    data: kills,
                                    width: 600,
                                    height: 400,
                                    target: "#chart__kills",
                                    x_accessor: "date",
                                    y_accessor: "value",
                                    legend: ['Red kills','Blue kills']
                                });

                                MG.data_graphic({
                                    title: "Flag collections",
                                    description: "Hourly captures for each team.",
                                    data: collected,
                                    width: 600,
                                    height: 400,
                                    target: "#chart__flags_collected",
                                    x_accessor: "date",
                                    y_accessor: "value",
                                    legend: ['Red collections','Blue collections']
                                });

                                MG.data_graphic({
                                    title: "Flag captures",
                                    description: "Hourly captures for each team.",
                                    data: captured,
                                    width: 600,
                                    height: 400,
                                    target: "#chart__flags_captured",
                                    x_accessor: "date",
                                    y_accessor: "value",
                                    legend: ['Red captures','Blue captures']
                                });

                                MG.data_graphic({
                                    title: "Kill Locations",
                                    data: result.killLocations,
                                    width: 600,
                                    height: 400,
                                    target: "#chart__kill_locations",
                                    x_accessor: "x",
                                    y_accessor: "y"
                                });
                            });
                });
            }
        }
    }
</script>