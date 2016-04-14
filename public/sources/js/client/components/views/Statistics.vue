<template>
    <br>
    <div class="row">
        <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4 center-block">
            <canvas id="chart__kills" width="400" height="400"></canvas>
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
                    var ctx = document.getElementById("chart__kills").getContext("2d");
                    api.statistics()
                            .then(result => {
                                var baseChart = new Chart(ctx, {
                                    type: 'line',
                                    data: result.kills
                                });

                            });
                });
            }
        }
    }
</script>