<template>
  <div className="App">
    <header className="App-header">
      <img
        src="@/src/static/logo.png"
        className="App-logo"
        alt="logo"
      >
      <p>
        Edit <code>src/App.vue</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://vuejs.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn Vue3
      </a>
    </header>
  </div>
</template>

<style scoped lang="less">
.App {
    text-align: center;
  }

  @media (prefers-reduced-motion: no-preference) {
    .App-logo {
      animation: App-logo-spin infinite 10s linear;
    }
  }
  .App-logo {
    height: 40vmin;
    pointer-events: none;
  }

  .App-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    color: #3fb883;
    font-size: calc(10px + 2vmin);
  }

  .App-link {
    color: #3fb883;
  }
   @keyframes App-logo-spin {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(360deg);
    }
  }
</style>
