import React, { useEffect, useState } from "react";
import Facebook from "../contact-logo/facebook";
import Line from "../contact-logo/line";
import Phone from "../contact-logo/phone";
import Image from "next/image";
import { useRouter } from "next/router";
import { currentBrowser } from "@/utils/platform";
import Link from "next/link";

function Footer() {
  const [brower, setBrower] = useState();
  const router = useRouter();
  const isBrowser = () => typeof window !== "undefined";
  isBrowser();

  useEffect(() => {
    setBrower(currentBrowser(window));
  }, [router.isReady]);
  console.log(brower);
  return (
    <div
      id="contact-us"
      className="w-full h-96 bg-main-color px-5 flex flex-col md:flex-row gap-6 
    md:justify-center justify-center items-center"
    >
      <div className="w-16 h-16 rounded-full overflow-hidden relative  ">
        <Image
          src="/logo/logo.jpg"
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAIlAooDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAWEAEBAQAAAAAAAAAAAAAAAAAAARH/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/ACor6DxAAAACooAAKACgAKigKigKigKioKACgICoqAqKigCCgMgqKigDIAIoAyADIAMqAICAyoAgIqIAAIAgIqCgIqACggKACiAKCKioAKACiAAAKAAjkA9zCiAKAAqAKAAqKAqKAqKAqKAqKAqKgKigKioCoqAqKigCCgMgqCKoDIAIoAyADKgCAAyIAyoAggCAioAAioAAgKgAogCgiooAKCAqACgiooAKAAAAjkA9zAAAqAKACiKAqAKqAKqAKqAKqCCgAqoIKqAKAiqAgoCAqKyoAgoisgAyoAgAMqAMggIADKiAgAIIAKIqIAAIAoICoAKIAoAigAoCCoAKAgoqAAADkA9rmKgCiKoKgCgAoigKigKigoigoioKIoKIqCiKiqIqAqKgKggoCKoisgAigDIqAgqAyoAyACKCDIAICAigIAAgIAAIoAKCAqCAoAKCAoAioqAoAKAICiAOYg9rCiKAACiAKqAKACgCKAKoigoigqoIKqAKqCCqggoCCiKiioIKAyCoIqiDIoDKgioAgyKgIoCMioCACIoAAgACAAICoCggKAIqACggKACgIKgAoAACAOYg9rCiAKACiAKqAKIoKIoKrKgqoAqoIKqAKqCCqggqoCqqCCgMiiKgKgiqIMigIoAyACAAyoIIADICCKAICAAgAAgAICoCgIKAIoAKgIKAIoogoAKAgCiAOYg9jCiAKIAqoAqsqCiKCiKCiKIqsqCqyoqqggqoAqoIKqCCqggoCKoioCoMiiKigDIAIACKAjIoggAMqCCACAqAgIAoCAAgioCggKAgoAiioCgIKioCgIKKIAogDkIPYyoiiKIAoigoigogDQgDQigoioKIoKrKoKqAKqCCqgiqqCCgIKIIKqCKogyKAgAIoAyAIgogigDICCACCqgiCoAAgACKAIACKKgKgIKAgoqAoCCioCoAACAOYg9bKiAKIoKIAqoAqsqCqyoKqAKqANCKgoigqsqgqsqgqsqCiKgoioqiCCqgyKIIKIIqgjIoggogiqgMgCIKgIoIAAiCoICoACAoCCgIACCgCKKgKgIKKgiiiCiiAKIA5CD1MqIAqoAogDQgDQgDQgDQgDSsqCqyqIqoCtCCDQigoioKIINCCCqggogiqqDIoggogiqIIKIMgCIqiCACAqAgCAAgiggoAgAIoqCKioIoqCKKIKAgCiIqKIKKIAogDkIPUiiAKrKgogDQgDQgg0rKgqsqIqoA0IINCKCqyqCqgCqggqoIqqyqCiCDQggoggoCKAMgAgAiKoggqCIKICgIgAgKggKggKggKgiioIoqAoCCgIKgIKKIgKIKKIAogDkIPSiiaAqs6oKIA0IA0ICNKyqCqyoNCANCKgqsqCqgg0IA0IINCCDQggqoIqiCDQggoggogiqIIKIIAIiqIIAICoCAgACAoIACCgICAgoCCgIKAgoCCioICiaKKJpoijOgrmMj0I0JoCqzpoNCANCGg0ICNKyqCqyoNCANKyqCqgDQgg0IoKrKoKrKoKIqCiCDQggogiqIoACACIKIIqiCACIKgCgggCAAgAIACCgIACCgIiiiIooiaoogqGiGgompqjSIAogDkammu4urrIDWiANGs6oNDKg0agI0rKoKrKg0IA0rKoNDKg0IqIqsqCqyqCqgiqrKoKIoKIIKrKoKIIKIIqiCCoCAICqgIAgACIAICoIACKoIACCgIAIIqKgiioIoupoiiiaAqIKLpqALpqAOQya7jRqaaguqzoDSs6aDWqyoKrKiNCCDSsqDQgDSsqiNCANKyqCqyoNCCDQgg0IIKrKgoioqiCCiCCiCCiAqiCACIKIAAgoCIKggKggKgiioIAIKCCAqCKKgiipqCiohqipogLpqCiommgommg5aammuwuiaA0azq6DWjK6g1oyoNKzoI0rKoNKyoNDKg0rKojQyoNKyqCqyoNCCDQgg0IA0IIKrKoKIIKICqIIKIIKIAogiggCoIgqCAqCCqggKgiioIAIKCCKKmiACCgIaoCChogIqJpqimoAoiA5aammurSqzpoNaJpoNLrOgjWrrOqg0azqiNKzqoNCANKyojSsqgqsqDSsqgqsqDQgg0IINCANCCCqggogCiCDQggogKCCCiAKggKgiKqAAIAIACCKKggAgoIIoqIAGoiioJqipoiioamgpqIoumppoLpqaaDjprOmujTWrrOmg1q6zpoNaus6aI1q6zqoNLrOmiNqwug0rKojSsqDSsqgqsqDSsqiKrKg0IINKyINCKCiCDQgCiKiqIIKIAoggqAAICqgiCiAAgAIACAogiioIAIiioIAIKCCKKhqKAhoAmihpqGqLompoNDOmg46azpro21q6xq6I1q6xq6DWrrOmojems6ug0usqiNKyoNKyqI0rKg0IIjSsqDSsqgqsqDQgg0IoKrKoKIINCAKrKoKIAogiqIAogAIIKIACAoIAAgAgAgiioIAIKoggAgoIIoCIC6gmqKmiKLqCAommqKamoDhprOmujeN6azpoN6azq6iNaus6aDerrGrqI2usaojasKg2rCiNNMKiNKyoNKyqDSsqCqyqI0IINKyoKrKoKrKgogg0ICqIIKIAoggogCiAoIAAgKggKggoCACACCKAIAgiggKCCACIoqCKKmoACGqKM6AumoKPNprGmurtjerrnq6iY6ausasojerrEq6iN6usa1KiNasZVEa1WVEaVlUGlZURpWVQaVlRGlZVBVQQaVlQVWVQVUAVWVQVWVBRBBRFBRBBRAUEAUQQVBAVAFEABAAQQAEUEAUQRQQQAEUEEUEEUVBABBQEFAQBRAHkEHZ1UQBqVZWF0HSVZWJWpWWW5VlYlalRGpWmJViI3FZURqKyqI0rKxEaVlQaVlUGlZURoRUFVlQaEEGhBBoQBVQQUQBoQRVEAUQBRBABBVEABAAEABABAUQQFQQBBFBAUEEAQRQQFBBFAQAEFAQFVAB5RFdnQAAABdWVkB0lalc5W5UZrcqxiNRGWo1GI0iNRWVRGljKoNKiiKqKgqsqI0rKoKqANCKgoioKIoKIIKqAqiCCiKAAgAgqiCACAqAAgCiAAggAIAggAIqiCAIIoICiAiggigCACCgIAogo8wDs2AAKgCiKosalYWVCukajErURlqNRiNRGWorMWIjTTMWINRWVRGlZUGhFQVUERoRQVWVQVUEFVAFVBFURQUQQUQQUQFUQQAABBFAQFQQAEABAEAVAQBABEVFBBF0EENBAUQEUEBQQQFQFAQBwEHpaUQBQAAAFiArcrUYjUSs1uNRiNREajTEaRlpYyqDSsqiNKyqDSsqI0rKoKqCDQioKrKgoioqiKgogCiKgAIoAAAgAiCoAogIAgAIIogGgghoIBoIIaCCLoIqGggi6CCLoIqLoIIugCGgAugIGjgA9agAACiiAKAKsajDUErcajEajLLcWMxYiNKkWIjUWMxUGlZVEaVlQVUVBVQQaEVBRFQURRVEVAVBBRBBQEUAQARBRAUAQEBFEBAQE0EETQRUNUQARFRQQARFRREVFBFRREVFQQAQBRAFAAHnAe9BUAUQFUABUAVYysFbjUZjURlqNRiNRlGosZjURFioqI0rKoNCKCqioKrKoKqCDQioKIqCiCKqoIKIIKAigCAAigggAiACM6qoImgAioACAgCKigiooiKgCKioiKigiooiKigioCAKIKgACjziD6DGqIC6oihoACiKKLEBW41GI1ErLcWMxqIjUWMxqIixUVBoSKg0IqIqoqKqsqgqoqCiKgoioKIIqqggoisgAigCAAiiAyAIzVARm0AEURUARUUEVAEBRAFERUEEVFERUUEVFERRURFQBFRQABBUUeYB9FgAAAAVBRRFFFQFbjUYjUSo3FjMajKNRYy0iLFSKg0rKoNCKgqoqCqgg0IqKoioKIqCiKyoqCCgIADKgCAAyoCM0ARiqAIAAqAKIAAioogAiAKIioAiooiKKIioqIKgIiiiAKiAAAA8oD6bIAAAAAAAoogDUbjEaiUbixmNRlGosZjURFajKxBpWVQaVlUGlZVFVUVBRFQVUGVVUEFVBBQEUAZFEVFBBkVAZqgIxVAGABAVAAAVUAEQBRAAQBREVAEVFEAVERUUEVBEFRRBUARRUQUB5AH1EAAAAAAAAAVRY1GY1EZrUWMxqIjUWJFjI1FZVBpUVFVUVBVRUFEVBVQZVVRUFEVFFRWQVBFUBkAEUAZoAM1RAc6oAyCAAAoIqAAAgCiAAgCiAAiKioIqKIACIoqIiiiACIAAAo8gD6iAAAAACgCgAAsajMagzVjUZisstRYkWINRYkVFVUVBVRUFVFZVVRUFEVFVUEFVBlVAQUBlRUEFAZUAZoAjFUAYqiAyACgAAioAACAKIACAKIAIiKigioogqCIAogCogACKAgAjyAPrAAAAAoAAAAKLGozGojNVUVGVjUZaiIsajMWIrSpFjIqoqKqoqCgIqqisiiKiqAgoDKioqAAyoqKyoIrNEAYqiKjnVAAAAAAEVAAAQBRAAQBRABEAURFRQRUEEVFEAEQVFQAAAB4wH1gAAVFAAAAUAAWNRmNRGaqoqMqsRURqLEixBpYzGkVVRWVVUVBRFRVVFQFRWVUBBQEUVFZABlQBlQBmgAxVEBzqgAAAAACKgAAIAogAIAogAiAKIioqCKgCKioIqAIqKgAAADxgPrAAAoAAAAKAALGgRlVBGVUERqLAQWNAiqoIqqDIKCKqggKCKoDIoCKKDIAMqAMqAM0AGKqAOdUAAAAAAQAAAQBRAAQBRABEAURAEEBQQFQQAEBUAAAAf/9k="
        />
      </div>
      <div className="flex gap-3">
        <a
          target="_blank"
          href="https://www.facebook.com/trekkingthailandtour"
          rel="noopener noreferrer"
        >
          <Facebook secondColor={true} />
        </a>

        <Line secondColor={true} />
        <Phone secondColor={true} />
      </div>
      <div className="flex justify-between gap-5">
        <div>
          <p className="text-white font-Poppins font-bold text-sm">
            contact us
          </p>
          <ul className="text-white text-xs">
            <li>(+66) 0897190750 Guide BEER </li>
            <li>(+66) 0819978805 Guide LEK</li>
            <li>Email : To.Be.Journey@gmail.com</li>
            <li>Trekking.thailandtour@gmail.com</li>
            <li>ID LINE : Guide.beer</li>
          </ul>
        </div>
        <div>
          <p className="text-white font-Poppins font-bold text-sm">service</p>
          <ul className="text-white text-xs">
            <li>Khao Yai Tour</li>
            <li>Korat The UNESCO Triple Heritage City Tour</li>
            <li>Special Tour</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
