"use client";

export function Footer() {
  return (
    <div className="pt-20">
      {" "}
      <div className="w-screen h-90 bg-blue-500 font-bold inset-x-0 bottom-0">
        <div className="p-12">
          <div className="">
            <div className="size-xl ">
              <div image={"whitelogo.png"} className="text-white text-xl">
                <a
                  href="/"
                  className="text-xl font-bold tracking-tight text-purple-500">
                  Movie Z
                </a>
              </div>
              <div className="text-white text-">
                © 2024 Movie Z. All Rights Reserved.{" "}
              </div>
            </div>
          </div>
          <div className="flex flex-col text-white">
            <div className="">Contact Impormation</div>
            <div className="">Email: support@movieZ.com</div>
            <div className="">Phone: +976 (11) 123-4567</div>
          </div>
          <div className="text-white">
            <div>Follow us</div>
            <div className="gap-4">Facebook Instagram Twitter Youtube</div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
