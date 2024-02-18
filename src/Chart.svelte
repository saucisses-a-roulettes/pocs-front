<!-- Chart.svelte -->
<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    export let monthlyBudget = 1000;
    export let pubBudget = 50;
    let pubBudgetPourc = (pubBudget/monthlyBudget)*100;
  
    let chart;

    function updateChartData() {
    // Mettre à jour les données du graphique
    for (let l=0; l<chart.data.datasets[1].data.length; l++){
      chart.data.datasets[1].data[l] = pubBudget;
    }
    for (let i=0; i<chart.data.datasets[0].data.length; i++){
      chart.data.datasets[0].data[i] = monthlyBudget;
    }
    chart.update(); // Redessiner le graphique
  }
  
  onMount(() => {
    const ctx = document.getElementById('myChart').getContext('2d');
  
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
        datasets: [{
          label: 'Mensual budget',
          data: [monthlyBudget, monthlyBudget, monthlyBudget, monthlyBudget, monthlyBudget, monthlyBudget, monthlyBudget, monthlyBudget, monthlyBudget, monthlyBudget, monthlyBudget, monthlyBudget],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
          ],
           borderColor: [
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        },{
          label: 'Pub budget',
          data: [pubBudget, pubBudget, pubBudget, pubBudget, pubBudget, pubBudget,pubBudget, pubBudget, pubBudget, pubBudget, pubBudget, pubBudget],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });
  </script>
  <h1>Votre budget mensuel est de: <bind:value>{monthlyBudget}</bind:value> Euros
  </h1>
  <h2>Pub budget represent <bind:value>{pubBudgetPourc}</bind:value> % of the total budget</h2>
    <canvas id="myChart" width="400" height="400"></canvas>
  
  <button on:click={() => updateChartData()}>Update charts data</button>
  
  <style>
    /* You can add custom styles for your chart canvas if needed */
  </style>