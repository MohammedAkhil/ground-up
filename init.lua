hyper = { "ctrl", "alt", "cmd", "shift" }
local applicationHyperHotkeys = {
	a = "Arc",
	-- s = "Visual Studio Code",
	s = "Cursor",
	d = "iTerm",
	f = "zoom.us",
	q = "Obsidian",
	w = "Docs",
	e = "Notion Calendar",
	r = "Spotify",
	t = "Things3",
}

for key, app in pairs(applicationHyperHotkeys) do
	hs.hotkey.bind(hyper, key, function()
		hs.application.launchOrFocus(app)
	end)
end

-- We use 0 to reload the configuration
hs.hotkey.bind(hyper, "0", function()
	hs.reload()
end)
-- Notify about the config reload
hs.notify.new({ title = "Hammerspoon", informativeText = "Config loaded" }):send()

-- Lock Screen
--
hs.hotkey.bind(hyper, "1", function()
	hs.caffeinate.lockScreen()
end)

-- Connecting To Specific Wi-Fi
--
MainSSID = "Yas&Ak"
SecondarySSID = "Airtel_9677553299"
SSID = hs.wifi.currentNetwork()

hs.hotkey.bind(hyper, "9", function()
	if SSID ~= MainSSID then
		hs.wifi.associate(MainSSID, "andrill05")
	end
end)

-- Network Test
--
function pingResult(object, message, seqnum, error)
	if message == "didFinish" then
		avg = tonumber(string.match(object:summary(), "/(%d+.%d+)/"))
		if avg == 0.0 then
			hs.alert.show("No network")
		elseif avg < 200.0 then
			hs.alert.show("Network good (" .. avg .. "ms)")
		elseif avg < 500.0 then
			hs.alert.show("Network poor(" .. avg .. "ms)")
		else
			hs.alert.show("Network bad(" .. avg .. "ms)")
		end
	end
end
hs.hotkey.bind(hyper, "8", function()
	hs.network.ping.ping("8.8.8.8", 1, 0.01, 1.0, "any", pingResult)
end)

hs.window.animationDuration = 0
hs.hotkey.bind(hyper, "2", function()
	local win = hs.window.focusedWindow()
	if not win then
		return
	end
	win:moveToUnit(hs.layout.left50)
end)
hs.hotkey.bind(hyper, "3", function()
	local win = hs.window.focusedWindow()
	if not win then
		return
	end
	win:moveToUnit(hs.layout.maximized)
end)
hs.hotkey.bind(hyper, "4", function()
	local win = hs.window.focusedWindow()
	if not win then
		return
	end
	win:moveToScreen(win:screen():next())
end)
hs.hotkey.bind(hyper, "5", function()
	local win = hs.window.focusedWindow()
	if not win then
		return
	end
	win:moveToUnit(hs.layout.right50)
end)

--------------------------------
-- START VIM CONFIG
--------------------------------
local VimMode = hs.loadSpoon("VimMode")
local vim = VimMode:new()

vim:enterWithSequence("jk")

-- Configure apps you do *not* want Vim mode enabled in
-- For example, you don't want this plugin overriding your control of Terminal
-- vim
vim
	:disableForApp("Code")
	-- :disableForApp("zoom.us")
	:disableForApp("iTerm")
	:disableForApp("iTerm2")
	:disableForApp("Terminal")
	:disableForApp("Arc")
	:disableForApp("Cursor")

-- If you want the screen to dim (a la Flux) when you enter normal mode
-- flip this to true.
vim:shouldDimScreenInNormalMode(false)

-- If you want to show an on-screen alert when you enter normal mode, set
-- this to true
vim:shouldShowAlertInNormalMode(true)

-- You can configure your on-screen alert font
vim:setAlertFont("Geist Mono")

-- Enter normal mode by typing a key sequence
-- vim:enterWithSequence('jk')

-- if you want to bind a single key to entering vim, remove the
-- :enterWithSequence('jk') line above and uncomment the bindHotKeys line
-- below:
--
-- To customize the hot key you want, see the mods and key parameters at:
--   https://www.hammerspoon.org/docs/hs.hotkey.html#bind
--
vim:bindHotKeys({ enter = { { "ctrl" }, ";" } })

--------------------------------
-- END VIM CONFIG
--------------------------------
