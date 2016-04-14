<template>
    <br>
    <div class="row">
        <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4 center-block">
            <div id="chart__kills"></div>
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
                                var data = [
                                    {'date': new Date('2015-04-01'), 'value': 12},
                                    {'date': new Date('2015-04-02'), 'value': 18},
                                    {'date': new Date('2015-04-010'), 'value': 98}
                                ];

                                console.log(result);

                                var kills = [];
                                for (var i = 0; i < result.kills.length; i++) {
                                    kills[i] = MG.convert.date(result.kills[i], 'date');
                                }

                                console.log(kills);

                                MG.data_graphic({
                                    title: "Kills",
                                    description: "Daily kills for each team.",
                                    data: kills,
                                    width: 600,
                                    height: 400,
                                    target: "#chart__kills",
                                    x_accessor: "date",
                                    y_accessor: "value",
                                    legend: ['Kills Red','Kills Blue']
                                });

                            });
                });
            }
        }
    }
</script>