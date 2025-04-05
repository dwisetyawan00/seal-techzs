"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu as NavMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Home, ListChecks, Ticket, Sparkles, BookOpen, Trophy, Lock } from "lucide-react"

interface NavigationMenuProps {
  isLoggedIn?: boolean
}

export function NavigationMenu({ isLoggedIn = false }: NavigationMenuProps) {
  return (
    <div className="sticky top-0 z-50 w-full border-b-2 border-yellow-400 bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-lg">
      <div className="container flex h-16 items-center px-4">
        <NavMenu className="mx-auto">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/30 hover:text-white focus:bg-white/30 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-white/30 data-[state=open]:bg-white/30">
                  <Home className="mr-2 h-4 w-4 text-yellow-300 group-hover:text-yellow-200" />
                  <span className="font-bold">Home</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/allowlist" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    isLoggedIn
                      ? "bg-white/20 text-white hover:bg-white/30 hover:text-white focus:bg-white/30 focus:text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white/90",
                  )}
                >
                  {isLoggedIn ? (
                    <ListChecks className="mr-2 h-4 w-4 text-green-300 group-hover:text-green-200" />
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4 text-gray-300 group-hover:text-gray-200" />
                    </>
                  )}
                  <span className="font-bold">Allowlist</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/subscription" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    isLoggedIn
                      ? "bg-white/20 text-white hover:bg-white/30 hover:text-white focus:bg-white/30 focus:text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white/90",
                  )}
                >
                  {isLoggedIn ? (
                    <Ticket className="mr-2 h-4 w-4 text-cyan-300 group-hover:text-cyan-200" />
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4 text-gray-300 group-hover:text-gray-200" />
                    </>
                  )}
                  <span className="font-bold">Subscription</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "group text-white",
                  isLoggedIn
                    ? "bg-white/20 hover:bg-white/30 hover:text-white data-[state=open]:bg-white/30"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white/90 data-[state=open]:bg-white/20",
                )}
              >
                <Sparkles
                  className={cn(
                    "mr-2 h-4 w-4",
                    isLoggedIn
                      ? "text-amber-300 group-hover:text-amber-200"
                      : "text-gray-300 group-hover:text-gray-200",
                  )}
                />
                <span className="font-bold">Rewards</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-gradient-to-b from-fuchsia-600 to-violet-700 rounded-lg">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className={cn(
                          "flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md",
                          isLoggedIn
                            ? "bg-gradient-to-b from-amber-400 to-orange-500"
                            : "bg-gradient-to-b from-gray-600 to-gray-700",
                        )}
                        href="#"
                      >
                        <Trophy className={cn("h-8 w-8", isLoggedIn ? "text-white" : "text-gray-400")} />
                        <div className="mb-2 mt-4 text-lg font-bold text-white">Achievements</div>
                        <p className={cn("text-sm leading-tight", isLoggedIn ? "text-white" : "text-gray-300")}>
                          Complete challenges and earn special rewards as you explore Mojila Seal features.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                          isLoggedIn
                            ? "bg-white/20 hover:bg-white/30 focus:bg-white/30"
                            : "bg-white/10 hover:bg-white/20 focus:bg-white/20",
                        )}
                        href="#"
                      >
                        <div
                          className={cn(
                            "text-sm font-bold leading-none",
                            isLoggedIn ? "text-yellow-200" : "text-gray-300",
                          )}
                        >
                          Daily Quests
                        </div>
                        <p
                          className={cn(
                            "line-clamp-2 text-sm leading-snug",
                            isLoggedIn ? "text-white" : "text-gray-400",
                          )}
                        >
                          Complete daily tasks to earn XP and level up faster
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                          isLoggedIn
                            ? "bg-white/20 hover:bg-white/30 focus:bg-white/30"
                            : "bg-white/10 hover:bg-white/20 focus:bg-white/20",
                        )}
                        href="#"
                      >
                        <div
                          className={cn(
                            "text-sm font-bold leading-none",
                            isLoggedIn ? "text-green-200" : "text-gray-300",
                          )}
                        >
                          Leaderboard
                        </div>
                        <p
                          className={cn(
                            "line-clamp-2 text-sm leading-snug",
                            isLoggedIn ? "text-white" : "text-gray-400",
                          )}
                        >
                          See how you rank against other users in the community
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                          isLoggedIn
                            ? "bg-white/20 hover:bg-white/30 focus:bg-white/30"
                            : "bg-white/10 hover:bg-white/20 focus:bg-white/20",
                        )}
                        href="#"
                      >
                        <div
                          className={cn(
                            "text-sm font-bold leading-none",
                            isLoggedIn ? "text-cyan-200" : "text-gray-300",
                          )}
                        >
                          Badges
                        </div>
                        <p
                          className={cn(
                            "line-clamp-2 text-sm leading-snug",
                            isLoggedIn ? "text-white" : "text-gray-400",
                          )}
                        >
                          Collect unique badges by mastering different features
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "group text-white",
                  isLoggedIn
                    ? "bg-white/20 hover:bg-white/30 hover:text-white data-[state=open]:bg-white/30"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white/90 data-[state=open]:bg-white/20",
                )}
              >
                <BookOpen
                  className={cn(
                    "mr-2 h-4 w-4",
                    isLoggedIn ? "text-pink-300 group-hover:text-pink-200" : "text-gray-300 group-hover:text-gray-200",
                  )}
                />
                <span className="font-bold">Learn</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] bg-gradient-to-b from-fuchsia-600 to-violet-700 rounded-lg">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className={cn(
                          "flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md",
                          isLoggedIn
                            ? "bg-gradient-to-b from-pink-500 to-purple-600"
                            : "bg-gradient-to-b from-gray-600 to-gray-700",
                        )}
                        href="#"
                      >
                        <div className="mb-2 mt-4 text-lg font-bold text-white">Documentation</div>
                        <p className={cn("text-sm leading-tight", isLoggedIn ? "text-white" : "text-gray-300")}>
                          Learn how to integrate Mojila Seal into your applications with our comprehensive guides and
                          API references.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                          isLoggedIn
                            ? "bg-white/20 hover:bg-white/30 focus:bg-white/30"
                            : "bg-white/10 hover:bg-white/20 focus:bg-white/20",
                        )}
                        href="#"
                      >
                        <div
                          className={cn(
                            "text-sm font-bold leading-none",
                            isLoggedIn ? "text-yellow-200" : "text-gray-300",
                          )}
                        >
                          Getting Started
                        </div>
                        <p
                          className={cn(
                            "line-clamp-2 text-sm leading-snug",
                            isLoggedIn ? "text-white" : "text-gray-400",
                          )}
                        >
                          A quick introduction to Mojila Seal concepts and features
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                          isLoggedIn
                            ? "bg-white/20 hover:bg-white/30 focus:bg-white/30"
                            : "bg-white/10 hover:bg-white/20 focus:bg-white/20",
                        )}
                        href="#"
                      >
                        <div
                          className={cn(
                            "text-sm font-bold leading-none",
                            isLoggedIn ? "text-green-200" : "text-gray-300",
                          )}
                        >
                          Tutorials
                        </div>
                        <p
                          className={cn(
                            "line-clamp-2 text-sm leading-snug",
                            isLoggedIn ? "text-white" : "text-gray-400",
                          )}
                        >
                          Step-by-step guides to help you implement access control
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavMenu>
      </div>
    </div>
  )
}

