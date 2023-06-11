/**
 * Classe do objeto que controla o tempo do jogo.
 */
class Timer {

    constructor() {
        this.started = false;
    }

    /**
     * Inicia a contagem de tempo.
     */
    start() {
        if (this.started) {
            this.stop();
        }

        this.time = 0
        this.control = setInterval(() => {
            this.time++;
            const hours = Math.trunc(((this.time / 100) / 60) / 60)
            const minutes = Math.trunc(((this.time / 100) / 60) % 60);
            const seconds = Math.trunc((this.time / 100) % 60);
            const milliseconds = this.time % 100;

            // Horas
            const hoursStr = (hours < 10) ? `0${hours}` : `${hours}`

            // Minutos
            const minutesStr = (minutes < 10) ? `0${minutes}` : `${minutes}`

            // Segundos
            const secondsStr = (seconds < 10) ? `0${seconds}` : `${seconds}`

            // Millisegundos
            const millisecondsStr = (milliseconds < 10) ? `0${milliseconds}` : milliseconds;

            // Alterando o conteúdo HTML do elemento
            let element = document.getElementById("timer")
            element.innerHTML = `${hoursStr}:${minutesStr}:${secondsStr}:${millisecondsStr}`;

        }, 10);
    }

    /**
     * Finaliza a contagem de tempo.
     */
    stop() {
        clearInterval(this.control);
        this.control = null;
        this.started = false;
    }
}