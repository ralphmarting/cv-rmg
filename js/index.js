$(document).ready(function() {
  const NAVBAR_HEIGHT = 75;
  const ANIMATION_SPEED = 200;

  $('#skillsAccordion .collapsed').click(function() {
    if ($('#skillsAccordion .collapsed').length === 0) {
      $('.collapse-toggle:contains("Collapse")').show();
      $('.collapse-toggle:contains("Expand")').hide();
    }

    if ($('#skillsAccordion .collapsed').length === 6) {
      $('.collapse-toggle:contains("Expand")').show();
      $('.collapse-toggle:contains("Collapse")').hide();
    }
  });

  $('.collapse-toggle').click(function() {
    const buttonText = $(this).text()
    $('.collapse-toggle').toggle();

    let skillList = [].slice.call($('.collapse'))

    skillList = skillList.filter(e => {
      switch (buttonText) {
        case 'Expand All':
          return !$(e).hasClass('show')
        case 'Collapse All':
          return $(e).hasClass('show')
      }
    })

    skillList.forEach(e => {
      new bootstrap.Collapse(e)
    })
  });

  $(window).scroll(function() {
    if(this.scrollY > 20) {
      $('.navbar').addClass("sticky-nav");
      $('.btn-back-to-top').fadeIn(ANIMATION_SPEED);
    } else {
      $('.navbar').removeClass("sticky-nav");
      $('.btn-back-to-top').fadeOut(ANIMATION_SPEED);
    }
  });

  $('.btn-back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, ANIMATION_SPEED);
  });

  $('.navbar-brand').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, ANIMATION_SPEED);
  });

  $('#navAbout').click(function() {
    $('html, body').animate({
      scrollTop: $("#about").offset().top - NAVBAR_HEIGHT
    }, ANIMATION_SPEED);
  });

  $('#navSkills').click(function() {
    $('html, body').animate({
      scrollTop: $("#skills").offset().top - NAVBAR_HEIGHT
    }, ANIMATION_SPEED);
  });

  $('#navCareer').click(function() {
    $('html, body').animate({
      scrollTop: $("#career").offset().top - NAVBAR_HEIGHT
    }, ANIMATION_SPEED);
  });

  $('#navEducation').click(function() {
    $('html, body').animate({
      scrollTop: $("#education").offset().top - NAVBAR_HEIGHT
    }, ANIMATION_SPEED);
  });

  $('.copyright-year').append(" - " + new Date().getFullYear())

  function getDateDiff(d1, d2) {
    let diff;

    //calculate number of diff in months
    diff = (d2.getFullYear() - d1.getFullYear()) * 12;
    diff -= d1.getMonth();
    diff += d2.getMonth();
    diff++;

    if (diff <= 0) {
      diff = "";
    }
    else {
      let resultFormat = " (";

      if (diff > 12) {
        const yearDiff = Math.floor(diff / 12);

        resultFormat += yearDiff + " yr";
        if (yearDiff > 1) {
          resultFormat += "s"
        }
        resultFormat += " ";

        diff %= 12;
      }

      resultFormat += diff + " mo";
      if (diff > 1) {
        resultFormat += "s";
      }
      resultFormat += ")";

      diff = resultFormat;
    }

    const options = {
      year: 'numeric',
      month: 'numeric'
    }

    diff = d1.toLocaleDateString('en-PH', options) +
      " - " + (
        d2.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0) ?
        "Present" :
        d2.toLocaleDateString('en-PH', options)
      ) +
      diff;

    return diff;
  }

  function populateCareer() {
    career.forEach(entry => {
      $('#career .timeline').append(`
        <li>
          <p class="date">
          ${
            entry.startDate ?
            getDateDiff(entry.startDate, entry.endDate) :
            "Future"
          }
          </p>
          <h4>${entry.role}</h4>
          <h5><i class="bi bi-building"></i> ${entry.company}</h5>
          <p>${entry.description}</p>
          ${(
            entry.awards ?
            entry.awards.map(award => {
              return `<p><i class="bi bi-award"></i>
                ${
                  award.title +
                  (
                    award.held ?
                    "<br>" + award.held :
                    ""
                  ) +
                  (
                  award.link ?
                  ` (<i class="bi bi-link-45deg"></i>
                  <a href=${award.link} target="_blank">Test Result</a>)` :
                  ""
                )}
                </p>`;
              }).join('') :
            ""
          )}
          <p class="career-technologies">
          <i class="bi bi-braces"></i> ${entry.technologies}
          </p>
          <p>
          <i class="bi bi-geo-alt-fill"></i>
          ${entry.location}
          </p>
        </li>
      `)
    })
  }

  function populateEducation() {
    education.forEach(entry => {
      $('#education .timeline').append(`
        <li>
          <p class="date">
          ${
            entry.endDate ? (
              entry.startDate ?
              getDateDiff(entry.startDate, entry.endDate) :
              entry.endDate.toLocaleDateString('en-PH', {
                year: 'numeric',
                month: 'numeric'
              }) + " (4 yrs)"
            ) :
            "Future"
          }
          </p>
          <h4>${entry.name}</h4>
          <h5><i class="bi bi-book"></i> ${entry.academe}</h5>
          ${(
            entry.description ?
            "<p>" + entry.description + "</p>" :
            ""
            ) +
            (
              entry.awards ?
              entry.awards.map(award => {
                return `<p><i class="bi bi-award"></i>
                  ${
                    award.title +
                    (
                      award.held ?
                      "<br>" + award.held :
                      ""
                    ) +
                    (
                    award.link ?
                    ` (<i class="bi bi-link-45deg"></i>
                    <a href=${award.link} target="_blank">Test Result</a>)` :
                    ""
                  )}
                  </p>`;
                }).join('') :
              ""
            ) +
            (
              entry.technologies ?
              `<p class = "career-technologies">
                <i class = "bi bi-braces"></i> ${entry.technologies}
              </p>` :
              ""
            ) +
            (
              entry.location ?
              "<p><i class='bi bi-geo-alt-fill'></i> " + entry.location + "</p>" :
              ""
            ) +
            (
              entry.references ?
              `<p>
              ${
                entry.references.map(reference => {
                  return `<i class="bi bi-link-45deg"></i>
                  <a href=${reference.link} target="_blank">
                  ${reference.linkText}
                  </a>`;
                }).join('')
              } </p>` :
              ""
            )
          }
        </li>
      `)
    })
  }

  populateCareer()
  populateEducation()
})
