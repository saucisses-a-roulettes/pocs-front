import {createEffect, createSignal, For, onMount, Show} from "solid-js";
import {SimpleButton} from "../component/button/simple";
import {ChartData} from "chart.js";
import {Line} from "solid-chartjs";
import {Asteroid} from "../model/asteroid";
import {NasaAsteroidRepository} from "../repository/asteroid";
import {nasaApiKey} from "../config";


export function Home() {
    const nasaAsteroidRepository = new NasaAsteroidRepository(nasaApiKey)

    const [startDate, setStartDate] = createSignal<Date>(new Date())
    const [endDate, setEndDate] = createSignal<Date>(new Date())
    const [asteroids, setAsteroids] = createSignal<Record<string, string>>({})
    const [selectedAsteroid, setSelectedAsteroid] = createSignal<string>("")
    const [asteroid, setAsteroid] = createSignal<Asteroid>()
    const [chartData, setChartData] = createSignal<ChartData>()

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    }

    function fetchNasaAsteroids(startDate: Date, endDate: Date) {
        nasaAsteroidRepository.fetchNasaAsteroids(startDate, endDate).then((data) => {
            setAsteroids(data)
        })
    }

    function fetchAsteroidById(id: string) {
        nasaAsteroidRepository.fetchAsteroidById(id).then((data) => {
            setAsteroid(data)
        })
    }

    function updateChartData() {
        const data = asteroid()?.close_approach_data.map((data) => data.miss_distance.kilometers)
        if (data) {
            const newChartData: ChartData = {
                labels: asteroid()?.close_approach_data.map((data) => data.close_approach_date),
                datasets: [
                    {
                        label: 'Distance (km)',
                        data: data,
                    },
                ],
            }
            setChartData(newChartData)
        }
    }

    function handleNewAsteroidSelection(event: MouseEvent & { currentTarget: HTMLButtonElement, target: Element }) {
        setSelectedAsteroid(event.currentTarget.id)
    }


    createEffect(() => {
        if (selectedAsteroid()) {
            fetchAsteroidById(selectedAsteroid())
        }
    })

    createEffect(() => {
        if (asteroid()) {
            updateChartData()
        }
    })

    onMount(() => {
        fetchNasaAsteroids(startDate(), endDate())
    })

    return (
      <div>
          <h1>Home</h1>
          <h2>Asteroids</h2>
          <For each={Object.entries(asteroids())}>
              {([id, name]) => (
                <SimpleButton id={id} onClick={handleNewAsteroidSelection}>{id} - {name}</SimpleButton>)}
          </For>
          <Show when={asteroid()} fallback={<p>Please select an asteroid</p>}>
              <p>{asteroid()?.name}</p>
              <div>
                  <Line data={chartData()} options={chartOptions}></Line>
              </div>
          </Show>

      </div>
    )
}
