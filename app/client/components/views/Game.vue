<script type="text/babel">
    export default {
        route: {
            activate() {
                setTimeout(() => {
                    $('#game').show();
                }, 1);
            },
            deactivate() {
                $('#game').hide();
            }
        }
    }
</script>