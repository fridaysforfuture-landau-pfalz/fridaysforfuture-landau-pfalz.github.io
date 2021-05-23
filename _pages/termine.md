<ul class="days-of-week clearfix">
  <li>Sunday</li>
  <li>Monday</li>
  <li>Tuesday</li>
  <li>Wednesday</li>
  <li>Thursday</li>
  <li>Friday</li>
  <li>Saturday</li>
</ul>

<ul class="days-of-month clearfix">
  <!-- Week One -->
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li><span>1</span></li>
  <li><span>2</span>Groundhog Day</li>
  <li><span>3</span></li>
  <!-- Week Two -->
  <li><span>4</span></li>
  <li><span>5</span></li>
  <li><span>6</span></li>
  <li><span>7</span></li>
  <li><span>8</span></li>
  <li><span>9</span></li>
  <li><span>10</span></li>
  <!-- Week Three -->
  <li><span>11</span></li>
  <li><span>12</span></li>
  <li><span>13</span></li>
  <li><span>14</span>Valentine's Day</li>
  <li><span>15</span></li>
  <li><span>16</span></li>
  <li><span>17</span></li>
  <!-- Week Four -->
  <li><span>18</span></li>
  <li><span>19</span>Presidents' Day</li>
  <li><span>20</span></li>
  <li><span>21</span></li>
  <li><span>22</span></li>
  <li><span>23</span></li>
  <li><span>24</span></li>
  <!-- Week Five -->
  <li><span>25</span></li>
  <li><span>26</span></li>
  <li><span>27</span></li>
  <li><span>28</span></li>
  <li></li>
  <li></li>
  <li></li>
</ul>

html { /* It's a good idea to have box-sizing: border-box on every element */
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

.clearfix:after { /* We need this to clear the floats */
  content: "";
  display: table;
  clear: both;
}

ul {
  margin: 0;
  padding: 0;
}

ul li {
  list-style-type: none;
  display: block;
  width: 14.2857143%; /* 100 / 7 = 14.2857143% */
  float: left;
}

.days-of-week li {
  text-align: center;
  color: #16a085;
  background-color: #fff;
  padding: 10px 0;
  border-top: 1px solid #fff;
  border-right: 1px solid #16a085;
  border-bottom: 1px solid #fff;
}

.days-of-week li:first-child {
  border-left: 1px solid #fff;
}

.days-of-week li:last-child {
  border-right: 1px solid #fff;
}

.days-of-month li {
  position: relative; /* We need this to position the spans and dates */
  padding: 25px 10px;
  height: 125px; /* Each day has a fixed height */
  text-align: center;
  border-top: none;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
}

.days-of-month li:nth-of-type(1) {
  border-left: 1px solid #fff;
}

.days-of-month li:nth-of-type(7n+8) {
  border-left: 1px solid #fff;
  clear: both; /* Clear the first day of each row */
}

.days-of-month li span {
  /* Position each date in the upper left-hand corner */
  position: absolute;
  top: 5px;
  left: 5px;
  font-size: 0.8em;
}

@media (max-width: 960px) {
  .wrap {
    padding: 25px;
  }

  .days-of-week {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  .days-of-month li {
    display: block;
    height: auto;
    width: 100%;
    padding: 0;
    text-align: left;
    float: none;
    border-top: none;
    border-left: none;
    border-right: none;
  }

  .days-of-month li:empty {
    /* hide the empty days = li without a span */
    display: none;
  }

  .days-of-month li:nth-of-type(1) {
    border-left: none;
  }

  .days-of-month li:nth-of-type(7n+8) {
    border-left: none;
    clear: both;
  }
  
  .days-of-month li span {
    position: static;
    display: inline-block;
    padding: 15px;
    margin-right: 15px;
  }
}
