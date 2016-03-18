<script type="text/babel">
    export default {
        route: {
            activate() {
                setTimeout(() => {
                    $('#game-container').show();
                    window.clashOfFlags.unpause();
                }, 1);
            },
            deactivate() {
                window.clashOfFlags.pause();
                $('#game-container').hide();
            }
        }
    }
</script>