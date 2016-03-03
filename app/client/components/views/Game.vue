<script type="text/babel">
    export default {
        route: {
            activate() {
                setTimeout(() => {
                    $('#game').show();
                    window.clashOfFlags.unpause();
                }, 1);
            },
            deactivate() {
                window.clashOfFlags.pause();
                $('#game').hide();
            }
        }
    }
</script>