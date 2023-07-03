<!-- The following code represents a section for Croatia Radio -->

<!-- Desktop View: Navigation Bar -->
<div class="hidden md:block bg-gray-200">
    <div class="grid grid-cols-12 gap rounded-lg px-10 py-4">
        <p class="col-span-2 font-semibold text-2xl robotoBlack m-auto">CROATIA RADIO</p>
        <div class="col-span-10 ml-auto text-lg roboto flex [&>p]:ml-6">
            <!-- Links to different pages -->
            <p><a href="/" class="!mt-0">Home</a></p>
            <p><a href="/genres">Genres</a></p>
            <p><a href="/search">Search</a></p>
            <p><a href="/news">News</a></p>
            <p><a href="/popular">Popular Radio Stations</a></p>
        </div>
    </div>
</div>

<!-- Tablet and Larger Mobile View: Main Content -->
<div class="hidden md:flex">
    <div class="row bg-gray-200 p-10 pr-4" style="width:100vw;min-height:100vh" >
        <div class="col-12 h-full xs" >
            <!-- Main content area within a white box -->
            <div class="h-full bg-white rounded p-10">
                <slot></slot> <!-- Content slot, possibly for dynamic content -->
            </div>
        </div>
    </div>
</div>

<!-- Mobile View: Navigation Bar -->
<div class="md:hidden">
    <div class="flex w-full py-3 bg-gray-100 " style="overflow: hidden;" >
        <div class="">
            <p class="ml-3 my-auto text-xl robotoBlack">Croatia Radio Station</p>
        </div>
        <div class="ml-auto mr-3">
            <img alt="Menu Icon" src="/menu.png" width="20" class="float-right my-auto" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" />
        </div>
        <!-- Off-canvas navigation menu -->
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header">
                <p class="text-4xl robotoBlack mx-4 mt-4">Croatia Radio Station</p>
            </div>
            <div class="offcanvas-body">
                <div class="side-list text-xl [&>p]:my-4 mx-4">
                    <!-- Links to different pages (closes the off-canvas menu) -->
                    <p data-bs-dismiss="offcanvas" aria-label="Close"><a  href="/">Home</a></p>
                    <p data-bs-dismiss="offcanvas" aria-label="Close" ><a  href="/genres">Genres</a></p>
                    <p data-bs-dismiss="offcanvas" aria-label="Close" ><a  href="/search">Search</a></p>
                    <p data-bs-dismiss="offcanvas" aria-label="Close" ><a  href="/news">News</a></p>
                    <p data-bs-dismiss="offcanvas" aria-label="Close" ><a  href="/popular">Popular Radio Stations</a></p>
                    <!-- Close menu link -->
                    <p class="float-right text-black text-sm underline mt-20" data-bs-dismiss="offcanvas" aria-label="Close">Close Menu</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Mobile View: Main Content -->
    <div class="px-4 mt-20 h-full overflow-auto py-4" >
        <slot></slot> <!-- Content slot, possibly for dynamic content -->
    </div>
</div>
