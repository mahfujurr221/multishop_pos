<!-- Topbar -->
<header class="topbar topbar-inverse gb-dark" id="topbar-colors">
  <div class="topbar-left">
    <span class="topbar-btn sidebar-toggler" style="color:white;"><i>☰</i></span>

    {{-- <a class="topbar-btn d-none d-md-block" href="#" data-provide="fullscreen tooltip" title=""
      data-original-title="Fullscreen">
      <i class="material-icons fullscreen-default">fullscreen</i>
      <i class="material-icons fullscreen-active">fullscreen_exit</i>
    </a> --}}

    {{-- <div class="dropdown d-none d-md-block">
      <span class="topbar-btn" data-toggle="dropdown"><i class="ti-layout-grid3-alt"></i></span>
      <div class="dropdown-menu dropdown-grid">

      </div>
    </div> --}}

    <div class="dropdown d-none d-md-block">
        <h3 style="color:white;text-align:center; font-weight:bold; display:inline-block;">SOFTGHOR Digital POS Software</h3>
        <p style="color:white; margin-left:15px; font-size:1.2em;display:inline-block; display:inline-block;">For Support: 01958-104256, 01958-104257 (10 AM - 06 PM)</p>

    </div>


    <div class="topbar-divider d-none d-md-block">

    </div>
  </div>

  <div class="topbar-right">
    <a class="topbar-btn" href="#" data-toggle="test"><i class="ti-align-right"></i></a>

    <div class="topbar-divider">

    </div>

    <ul class="topbar-btns">
      <li class="dropdown">
        @if(Auth::user())
        <span class="topbar-btn" data-toggle="dropdown"><img class="avatar"
            src="{{ asset(Auth::user()->profile->avatar) }}" alt="avater"></span>
        @endif
        <div class="dropdown-menu dropdown-menu-right">
          <a class="dropdown-item" href="{{ route('profile.index') }}"><i class="ti-user"></i> Profile</a>
          {{-- <a class="dropdown-item" href="#">
                <div class="flexbox">
                  <i class="ti-email"></i>
                  <span class="flex-grow">Inbox</span>
                  <span class="badge badge-pill badge-info">5</span>
                </div>
              </a> --}}
          <a class="dropdown-item" href="{{ route('pos.pos_setting') }}"><i class="ti-settings"></i> Settings</a>
          <div class="dropdown-divider"></div>
          {{-- <a class="dropdown-item" href="#"><i class="ti-lock"></i> Lock</a> --}}
          <a class="dropdown-item" href="#"
            onclick="event.preventDefault(); document.getElementById('logout-form').submit();"><i
              class="ti-power-off"></i> Logout</a>
          {{-- logout form --}}
          <form method="POST" id="logout-form" style="display:none" action="{{ route('logout') }}">
            @csrf
          </form>
        </div>
      </li>

      <!-- Notifications -->
      {{-- <li class="dropdown d-none d-md-block">
        <span class="topbar-btn has-new" data-toggle="dropdown"><i class="ti-bell"></i></span>
        <div class="dropdown-menu dropdown-menu-right">

          <div class="media-list media-list-hover media-list-divided media-list-xs">
            <a class="media media-new" href="#">
              <span class="avatar bg-success"><i class="ti-user"></i></span>
              <div class="media-body">
                <p>New user registered</p>
                <time datetime="2018-07-14 20:00">Just now</time>
              </div>
            </a>

            <a class="media" href="#">
              <span class="avatar bg-info"><i class="ti-shopping-cart"></i></span>
              <div class="media-body">
                <p>New order received</p>
                <time datetime="2018-07-14 20:00">2 min ago</time>
              </div>
            </a>

            <a class="media" href="#">
              <span class="avatar bg-warning"><i class="ti-face-sad"></i></span>
              <div class="media-body">
                <p>Refund request from <b>Ashlyn Culotta</b></p>
                <time datetime="2018-07-14 20:00">24 min ago</time>
              </div>
            </a>

            <a class="media" href="#">
              <span class="avatar bg-primary"><i class="ti-money"></i></span>
              <div class="media-body">
                <p>New payment has made through PayPal</p>
                <time datetime="2018-07-14 20:00">53 min ago</time>
              </div>
            </a>
          </div>

          <div class="dropdown-footer">
            <div class="left">
              <a href="#">Read all notifications</a>
            </div>

            <div class="right">
              <a href="#" data-provide="tooltip" title="" data-original-title="Mark all as read"><i
                  class="fa fa-circle-o"></i></a>
              <a href="#" data-provide="tooltip" title="" data-original-title="Update"><i class="fa fa-repeat"></i></a>
              <a href="#" data-provide="tooltip" title="" data-original-title="Settings"><i class="fa fa-gear"></i></a>
            </div>
          </div>

        </div>
      </li> --}}
      <!-- END Notifications -->

      <!-- Messages -->
      {{-- <li class="dropdown d-none d-md-block">
        <span class="topbar-btn" data-toggle="dropdown"><i class="ti-email"></i></span>
        <div class="dropdown-menu dropdown-menu-right">

          <div
            class="media-list media-list-divided media-list-hover media-list-xs scrollable ps-container ps-theme-default"
            style="height: 290px" data-ps-id="4dc50664-3675-df50-c5f0-173128e1d5a9">
            <a class="media media-new" href="#">
              <span class="avatar status-success">
                <img src="{{ asset('dashboard/img/avatar/1.jpg') }}" alt="...">
      </span>

      <div class="media-body">
        <p><strong>Maryam Amiri</strong> <time class="float-right" datetime="2018-07-14 20:00">23 min ago</time>
        </p>
        <p class="text-truncate">Authoritatively exploit resource maximizing technologies before technically.
        </p>
      </div>
      </a>

      <a class="media media-new" href="#">
        <span class="avatar status-warning">
          <img src="{{ asset('dashboard/img/avatar/2.jpg') }}" alt="...">
        </span>

        <div class="media-body">
          <p><strong>Hossein Shams</strong> <time class="float-right" datetime="2018-07-14 20:00">48 min
              ago</time></p>
          <p class="text-truncate">Continually plagiarize efficient interfaces after bricks-and-clicks niches.</p>
        </div>
      </a>

      <a class="media" href="../page-app/mailbox-single.html">
        <span class="avatar status-dark">
          <img src="{{ asset('dashboard/img/avatar/3.jpg') }}" alt="...">
        </span>

        <div class="media-body">
          <p><strong>Helen Bennett</strong> <time class="float-right" datetime="2018-07-14 20:00">3 hours
              ago</time></p>
          <p class="text-truncate">Objectively underwhelm cross-unit web-readiness before sticky outsourcing.</p>
        </div>
      </a>

      <a class="media" href="../page-app/mailbox-single.html">
        <span class="avatar status-success bg-purple">FT</span>

        <div class="media-body">
          <p><strong>Fidel Tonn</strong> <time class="float-right" datetime="2018-07-14 20:00">21 hours ago</time>
          </p>
          <p class="text-truncate">Interactively innovate transparent relationships with holistic infrastructures.
          </p>
        </div>
      </a>

      <a class="media" href="#">
        <span class="avatar status-danger">
          <img src="{{ asset('dashboard/img/avatar/4.jpg') }}" alt="...">
        </span>

        <div class="media-body">
          <p><strong>Freddie Arends</strong> <time class="float-right" datetime="2018-07-14 20:00">Yesterday</time></p>
          <p class="text-truncate">Collaboratively visualize corporate initiatives for web-enabled value.</p>
        </div>
      </a>

      <a class="media" href="#">
        <span class="avatar status-success">
          <img src="{{ asset('dashboard/img/avatar/5.jpg') }}" alt="...">
        </span>

        <div class="media-body">
          <p><strong>Freddie Arends</strong> <time class="float-right" datetime="2018-07-14 20:00">Yesterday</time></p>
          <p class="text-truncate">Interactively reinvent standards compliant supply chains through
            next-generation bandwidth.</p>
        </div>
      </a>
      <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
        <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
      </div>
      <div class="ps-scrollbar-y-rail" style="top: 0px; right: 2px;">
        <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
      </div>
  </div>

  <div class="dropdown-footer">
    <div class="left">
      <a href="#">Read all messages</a>
    </div>

    <div class="right">
      <a href="#" data-provide="tooltip" title="" data-original-title="Mark all as read"><i
          class="fa fa-circle-o"></i></a>
      <a href="#" data-provide="tooltip" title="" data-original-title="Settings"><i class="fa fa-gear"></i></a>
    </div>
  </div>

  </div>
  </li> --}}
  <!-- END Messages -->

  </ul>

<div class="topbar-divider"></div>
@if(session('shop')!=null)
    @if(Auth::user()->getRoleNames()->first() == 'admin')
        <select name="change_shop" id="" onchange="javascript:handleSelect(this)" class="form-control">
            @foreach (\App\Shop::get() as $shop)
                <option value="{{ $shop->id }}" {{ $shop->id==session('shop')?'SELECTED':'' }}>{{ $shop->name }}</option>
            @endforeach
        </select>

        <script>
            function handleSelect(elm)
            {
                window.location = "{{ route('shops.change_active') }}?shop_id="+elm.value;
            }
        </script>
    @else
        <a href="JavaScript:void(0)">{{ \App\Shop::find(session('shop'))->name }}</a>
    @endif
@endif
  </div>
</header>
<!-- END Topbar -->
