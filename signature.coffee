prepend = (id, content) =>
  document.getElementById(id).innerHTML = content

prepend('nav-top', '
<nav class="level navbar">
  <div class="level-item has-text-centered">
    <div>
    <p class="heading left-space">Welcome to</p>
    <p id="main-title" class="left-space">INSPIIIRED</p>
    </div>
  </div>
</nav>
')

prepend('nav-footer', '
  <nav class="level">
    <div class="level-item has-text-centered">
      <nav class="breadcrumb">
        <ul style="padding-top:2rem;">
          <li class="is-active heading"><a href="https://github.com/Beyarz/inspiiired">Github</a></li>
          <li class="heading"><a href="https://github.com/Beyarz/inspiiired">Beyarz</a"></li>
        </ul>
      </nav>
    </div>
  </nav>
')
