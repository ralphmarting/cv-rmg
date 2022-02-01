$('.collapse-toggle').click(function() {
  $('.collapse-toggle').toggle();

  let collapseElementList = [].slice.call($('.accordion-collapse'));
  collapseElementList.map(function(collapseEl) {
    new bootstrap.Collapse(collapseEl);
  });
});

$(window).scroll(function() {
  if ($(this).scrollTop()) {
    $('.btn-back-to-top').fadeIn(200);
  } else {
    $('.btn-back-to-top').fadeOut(200);
  }
});

$('.btn-back-to-top').click(function() {
  $('html, body').animate({
    scrollTop: 0
  }, 500);
});

$('#navAbout').click(function() {
  $('html, body').animate({
    scrollTop: $("#about").offset().top
  }, 500);
});

$('#navSkills').click(function() {
  $('html, body').animate({
    scrollTop: $("#skills").offset().top
  }, 500);
});

$('#navCareer').click(function() {
  $('html, body').animate({
    scrollTop: $("#career").offset().top
  }, 500);
});

$('#navEducation').click(function() {
  $('html, body').animate({
    scrollTop: $("#education").offset().top
  }, 500);
});

$('.copyright-year').append(" - " + new Date().getFullYear())

function getDateDiff(d1, d2) {
  let diff;

  diff = (d2.getFullYear() - d1.getFullYear()) * 12;
  diff -= d1.getMonth();
  diff += d2.getMonth();
  diff++;

  if (diff <= 0) {
    diff = "";
  } else if (diff < 12) {
    diff = " (" + diff + " mo" + (diff > 1 ? "s" : "") + ")";
  } else {
    diff = " (" + Math.floor(diff / 12) + " yr" +
      (Math.floor(diff / 12) > 1 ? "s" : "") +
      (diff % 12 > 0 ? (" " + diff % 12 + " mo" + (diff % 12 > 1 ? "s" : "")) : "") +
      ")"
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
            return `<p><i class="bi bi-award"></i> ${
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
          entry.location ?
          "<p><i class='bi bi-geo-alt-fill'></i> " + entry.location + "</p>" :
          ""
        ) +
        (
          entry.technologies ?
          `<p class="career-technologies">
            <i class="bi bi-braces"></i> ${entry.technologies}
          </p>` :
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
            }
          </p>` :
          ""
        )}
      </li>
    `)
  })
}

populateCareer()
populateEducation()
